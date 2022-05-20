---
title: Yew can use Tailwind anywhere!
alternateTitle: How to set up Tailwind in Yew
subtitle: even where there is no JavaScript
alternateSubtitle: hot-reloading included
author: Konstantin <mail@vomkonstant.in>
published: '2022-05-20'
illustration: '<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(1.0416666666666667,0,0,1.0416666666666667,0,0)"><g id="Sketch-annotation-element-stroke-illustration-line-christmas-tree">
<path id="Vector" d="M109.792 217.109C109.765 204.323 110.467 191.578 110.325 178.8C95.681 180.458 64.1214 177.551 50.046 172.88C64.2747 156.903 81.393 143.904 93.3775 125.433C84.9496 125.157 76.8666 124.695 68.4687 123.744C82.5489 113.059 95.5235 99.3278 106.184 84.294C99.3939 83.8783 92.4928 84.4198 85.6814 84.2545C90.0047 78.3398 95.7493 73.6413 99.7443 67.475C109.028 53.1462 116.275 38.5515 123.15 22.6654C126.102 31.8228 130.862 39.6342 135.307 47.8405C141.169 58.6642 147.894 72.5774 157.736 79.6588C151.974 79.9709 146.271 80.8027 140.499 80.9746C146.46 95.5867 159.76 107.962 172.317 114.977C164.49 118.685 156.882 120.481 148.571 121.838C150.729 126.998 154.624 130.935 157.832 135.192C167.034 147.399 177.508 157.355 189.744 165.217C179.65 173.733 146.79 179.502 134.242 178.65C133.865 191.174 135.567 203.566 135.901 216.059" stroke="currentColor" stroke-width="5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</g></g></svg>'
---

_If you are just looking for a template and don't care about the jibber-jabber: [Here you go. See ya!](https://github.com/Neugierdsnase/yew-wasm-pack-template)_

One of the reasons Tailwind is great is that it is completely JavaScript-agnostic. As soon as you have DOM elements - however they were created or are being updated - Tailwind just works. This means it can be used with Angular, React, Svelte as much as with Solid, Inferno or whatever other ten-minute old JavaScript frameworks you can think of. But why stop there? If it is true what I just wrote, then not even JavaScript should be the limiting factor here (as it is - quite obviously - for
CSS-in-JS solutions).

This is precisely why I argue it is a great choice for WebAssembly projects. Let's look at an example. Fear not, you don't have to fully understand what's going on here. Just know that Yew is a front-end framework for WebAssembly in Rust, that you can probably compare best with pre-v16 React (no hooks, but lifetime methods).

```rust
// ...

pub struct State {
    entries: Vec<String>,
}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    // ...

    fn view(&self) -> Html {
        html! {
            <div>
                <section>
                    <header>
                        <h1>{ "todos" }</h1>
                    </header>
                    <section>
                        <ul>
                            { for self.state.entries.iter().map(|val| self.view_entry(val)) }
                        </ul>
                    </section>
                </section>
            </div>
        }
    }
}

impl App {
    fn view_entry(&self, (idx, entry): (usize, &str)) -> Html {
      html! {
          <li>
              <p>{entry}</p>
          </li>
      }
  }
}
```

This is a (not quite complete) component written in Rust using the Yew framework. Speaking fuzzily about what's happening here: The `view` method uses the `html` macro to render HTML to the screen. You can also see an implementation block, that defines what an entry looks like, which is utilized by the iterator in the `ul` element.

So instead of JavaScript, we are writing our code in a multi-threaded systems-level language (thinking about the performance gains this promises should give you the shivers). This is possible because of the recently standardized WASM compile target, <a target="_blank" href="https://webassembly.org/roadmap/">which all major browsers have now implemented.</a>

As their respective ecosystems matured, Rust and WebAssembly developed a special kind of relationship. Rust has now become somewhat of the first choice for intellectually curious web developers if I can trust the information in my bubble.

Let's imagine for a second, that we would have to reinvent things like styled-components and styled-system for Yew and all the other frameworks, languages and frameworks in languages, that can compile to WASM. The horror! Thankfully - [as I have outlined here](https://blog.vomkonstant.in/blog/comparing-tailwind-with-plain-css-is-wrong) - Tailwind offers much (if not more) of the same functionality at practically no performance overhead.

## Rust is complicated enough, let's not also add CSS files

The question in my mind is: Can we set up Tailwind so that we can style our Yew components like this?

```rust
// ...

pub struct State {
    entries: Vec<String>,
}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    // ...

    fn view(&self) -> Html {
        html! {
            <div class="w-2/3 mx-auto">
                <section>
                    <header class="text-center my-4">
                        <h1 class="text-6xl text-red-600">{ "todos" }</h1>
                    </header>
                    <section class="my-4">
                        <ul>
                            { for self.state.entries.iter().map(|val| self.view_entry(val)) }
                        </ul>
                    </section>
                </section>
            </div>
        }
    }
}

impl App {
    fn view_entry(&self, (idx, entry): (usize, &str)) -> Html {
      html! {
          <li class="p-4 pr-0 my-2 border-b-2 border-slate-200 last:border-0">
              <p>{entry}</p>
          </li>
      }
  }
}
```

The short answer is: **"Yes!"** The slightly longer answer is: "Uhm, sure, but how do I set up my project for this? Will hot-reloading work?" Let's find out. Spoiler alert: Everything will work just fine in the end.

As is so often the case in technology, we can just copy the hard parts from the smart kids and some of them have created <a target="_blank" href="https://github.com/yewstack/yew-wasm-pack-template">this project template</a>, which sets up Yew with <a target="_blank" href="https://rustwasm.github.io/wasm-pack/installer/">wasm-pack</a>, which itself relies on <a target="_blank" href="https://webpack.js.org/">webpack</a> to bundle WebAssembly code with the necessary JavaScript and CSS to make everything flow together.

## Updating dependencies and scripts

To add Tailwind to this, let's - well - add tailwind.

```fish
yarn add -D tailwindcss
npx tailwindcss init
```

In the `package.json` I added these two scripts:

```json
"tailwind": "npx tailwindcss -i ./static/input.css -o ./output.css",
"tailwind:watch": "npx tailwindcss -i ./static/input.css -o ./output.css --watch",
```

also, I updated the dev and build scripts to include transpiling our CSS (you will need to install <a target="_blank" href="https://www.npmjs.com/package/concurrently">the `concurrently` package</a> globally if you haven't already).

```json
"dev": "concurrently \"webpack-dev-server --mode development --open\" \"yarn run tailwind:watch\"",
"build": "yarn run tailwind && webpack --mode production",
"build:dev": "yarn run tailwind && webpack --mode development",
```

## Overhauling config files

Now simply tell tailwind which files to include via the `tailwind.config.js`:

```js
module.exports = {
  content: ['./src/**/*.rs', './static/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

When examining the structure of our project, we can see that the styles are included in our app via the `bootstrap.js` file. So instead of the `styles.scss` (we can delete that), let's use our `output.css` file here.

We can also see, that there is some SCSS stuff going on, that we don't need, so let's clean that up, by removing the `sass` and `sass-loader` dependencies and telling webpack to test for `/\.css$/i` instead of
`/\.s[ac]ss$/i` in its config.

Lastly, we don't need the "todomvc" stylesheets, that are currently in the `index.html`'s `head`, so we can delete those too.

There we go! Mission accomplished!

![Very nice!](https://media2.giphy.com/media/Od0QRnzwRBYmDU3eEO/giphy.gif?cid=ecf05e477is7007gzagd8wbnm42z4wc0v0x9mewd2puwxc4k&rid=giphy.gif&ct=g)

## Some concerns

There are still two things that need addressing though.

1. If you are trying this by yourself, you will quickly realize, that Tailwind's Intellisense needs an extra invitation to our `.rs` files. This is easily done by adding `"tailwindCSS.includeLanguages": {"rust": "html"}` to your settings (this is how it works in VSCode, haven't tried it in other editors). After a reload tailwind should start working its magic for us in our Yew HTML macros, what a time to be alive!

1. Unfortunately, I haven't found a solution for this one. In all my other projects I use the <a target="_blank" href="https://github.com/tailwindlabs/prettier-plugin-tailwindcss">tailwind prettier plugin</a> to enforce its <a target="_blank" href="https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted">recommended class order.</a>

1. You will notice that with every save, the hot-reloading is triggered _twice_. Presumably, the second reload is triggered by the updated `output.css` file. This is of course not optimal, but I have also not found it to be a huge burden while developing.

## Conclusion

Aside from missing a few luxuries that the incredibly mature JavaScript ecosystem offers, I think this is a very comfortable way to leverage the powers of WebAssembly. In my opinion, the versatility of Tailwind adds immense value here, as both the technical, but also the mental overhead while developing are being kept to a minimum.

You find the finished setup [in this repository.](https://github.com/Neugierdsnase/yew-wasm-pack-template)
