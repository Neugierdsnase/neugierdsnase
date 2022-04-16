# Starting with Rust

Learning Rust is an intimidating task for a self-tought web developer like me. I was only ever confronted with high-level programming languages like JavaScript, Python and Kotlin, where a big chunk of complexity is abstracted away from the programmer.

Additionally, I have never felt the pain, which apparently occurs when trying to manually manage memory. All the languages I have ever used have a garbage collector and there is no need for the programmer to plague their mind with such arbitrary things. So you might say that Rust is solving a problem that I actually never had.

## So why?

So what is the reasoning behind a web developer learning Rust in the first place? After all, I am very well versed in my disciplines in which I make a great living. My skillset (everything aroung React) is in very high demand and companies are willing to spend big bucks on talent.

However, there is a door Rust opens, that might lead to a different future of web development. As more and more digital products move from running natively on the operating system to running in the browser, there are computationally more expensive things to be done. A future version of Photoshop - for example - might not be downloadable, but just run in a browser window. However, JavaScript is not equipped to handle picture manipulation on this scale with speed that would make for a good user-experience.

## WebAssembly

In comes WebAssembly. It is a binary instruction format, that significantly improves performance for web pages working in the browser. Some call this "nearnative" speed, although [this is a very generous way to put it.](https://www.usenix.org/system/files/atc19-jangda.pdf)

While a couple of years ago I had to download Firefox' nightly build to preview it's features, [it has now shipped in all the biggest browsers.](https://webassembly.org/roadmap/) Back then, it was far too early for me to get started with it, but as my expertise grew, so grew my confidence and with that my desire to learn something more complex.

## But why not just Python?

Even though I have never worked with it professionally, I am faily proficient in Python. It's a great language, where developer productivity is values higher than runtime performance. Python by itself is extremely slow, but experienced Pythonistas know to offload computantionally expensive tasks to external packages, which are often implemented in C under the hood, beating plain Python implementations by huge margins.

### Faster?

Still, even though I could not find any information on this, my assumption is, that Python, still providing a lot of convenience to the developer, will be outperformed by a systems-level language like Rust, even when run in the context of WebAssembly. The garbage collector, doesn't just go away, after all. I am planning to verify this assumption in the near future.

### Ecosystem

You can often hear, that Rust is an excellent choice for WebAssembly. Such statements are often self-fulfilling prophecies, as community growth is powered by a great ecosystem, which in turn leads to more people contributing and giving back to the ecosystem.

In Rust's case, this has so far beared fruit in the form of the [yew front-end framework,](https://yew.rs/) that is very similar to React, but comes with all the benefits WebAssembly promises. As things stand right now, I am planning to make this framework the focus of studies, once I have climbed the steep first learning curve of the basics of Rust.
