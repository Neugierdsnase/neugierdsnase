---
title: Comparing TailwindCSS with plain CSS is plain wrong
author: Konstantin <mail@vomkonstant.in>
published: '2022-05-09'
illustration: '<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-width="10" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11.27 89.844c5.437-7.04 11.214-12.512 18.943-16.929 55.62-31.782 87.677 36.25 135.593 50.062 30.354 8.75 73.913-3.376 72.299-42.482" stroke="currentcolor" stroke-width="20.491799999999998"/>
        <path d="M46.136 139.77c25.21-18.149 44.616-.906 65.137 14.145 26.56 19.479 59 38.254 91.556 19.935" stroke="currentColor" stroke-width="20.491799999999998"/>
    </g>
</svg>'
---

# Comparing TailwindCSS with plain CSS is plain wrong

A year ago I was teaching web development students about the various approaches to writing and organizing CSS, which is notoriously hard to maintain, in its "natural" form. Among the things I was showing was a brief mention of the "atomic CSS"-approach and the fact that TailwindCSS had gained a considerable amount of steam over the last few years. Back then, I was playing it down as a fad, telling them I didn't understand what all the fuss was about, basically telling them it was unjustified hype.

Fast forward to this semester, when I taught the same course to another class. My view had changed. I told my students, that I now believe there are good chances TailwindCSS will dominate the space for years to come, similar to how Bootstrap had been doing in the mid-2000s.

## Plain CSS is not Tailwind's competition

So what changed? During the months in-between I had realized, that the issues I had with Tailwind were invalid. I was comparing it to plain CSS, even though I had not been writing plain CSS - or even SCSS, Less, etc. - outside of my teaching engagements for quite literally *years*.

## What Tailwind is actually up against

Joining a ReactJS-legacy project you will quite likely find a stack similar to this: 

1. TypeScript
1. NextJS
1. React (duh)
1. Artifacts of a past Redux integration ("we tried to delete it, but when we do it breaks and we don't know why")
1. styled-components or emotionJS
1. styled-system

Let's focus on the last two points. These have likely been integrated because keeping extra CSS files for every React component quickly becomes unmaintainable with a growing project. So a decision was made to keep the styles within the component files. Eventually, it turned out to be cumbersome to write a stylesheet for every component in your application. To the rescue comes styled-system, which provides you with reusable components using inline styles via props, comprehensive theming functionality and an intriguingly simple way to write responsive styles.

## Performance-gore

None of this comes without a cost. The whole convoluted sentence you just decided not to read, is computed *at runtime* and believe me when I tell you, a peek under styled-system's hood reveals some treacherous caveats.

So what if we could have all of that power, but none of that runtime overhead? Sounds too good to be true? Well, let's take a look at how we would replace styled-system code with TailwindCSS in this simple example.

```tsx
const SomeComponent: FunctionComponent = ({children}) => (
  <SomeKindOfGeneralPurposeDiv
    position='absolute'
    px='md' // assuming a theme exsists where this is defined
    py='sm' // assuming a theme exsists where this is defined
    top='10vh'
    left='20vw'
    w='60vw'
  >
    {children}
  <SomeKindOfGeneralPurposeDiv>
)

```

These are six props that need to be computed at runtime by the browser's JavaScript interpreter. If we would use Tailwind, this code would be to the same effect:

```tsx
const SomeComponent: FunctionComponent = ({children}) => (
  <div
    className="
      absolute
      px-8
      py-4
      top-[10vh]
      left-[20vh]
      w-[60vw]
    "
  >
    {children}
  <div>
)
```

As we can see, the ideas at play are the same. In both examples, we use both 

* values defined in our theme/config for the padding and 
* arbitrary values that are presumably at this single spot for the positioning and width.

## Responsiveness

Let's take a look at responsive styling. I will just show single lines for brevity. This is how you might change a components margin depending on screen size in styled-system.

```tsx
  m={{sm: '4px', md: '8px', lg: '16px'}}
```

Easy enough, but note that added to everything else discussed above, the passed-in object gets created every time this component re-renders. *(Strictly speaking, this is a constant value, that should be moved out of the component entirely, defeating the whole point of readable responsive code.)*

On the other hand, doing the same thing in Tailwind looks very similar, but doesn't require unnecessary computing when running in the browser:

```tsx
  className="sm:m-1 md:m-2 lg:m-4"
```

## It goes even deeper...

How would you give a component a hover effect in styled-system or styled-components? Inline CSS, right?

```tsx
<RedOnHover
  css={css`
    &:hover {
      background-color: red;
    }
  `}
/>
```

Now if that isn't some ugly code. Let's compare this to what tailwind has to offer:

```tsx
<div className="hover:bg-red-500">
```

The "but tailwind is hard to read" argument backfires at this point. Tailwind offers the same principles with most of the other pseudo-selectors and media queries you would normally use: `focus`, `active`, `visited`, `first`, `last` and even `even`. If you are using animations or transitions, there is even a modifier to handle the `prefers-reduced-motion` media query with `motion-reduce:`.

## ... but it won't do that

Inexplicably, Tailwind does not yet support the `pointer` media query, which I frequently used to enlargen clickable areas for buttons on touch displays. [There seems to be an plugin in development](https://github.com/ShiftLimits/tailwindcss-interaction-media), but its activity doesn't stoke confidence. 

Aside from this minor nuisance, there are also natural limits to the atomic CSS approach. The one that had the most impact on me (while coding this very blog, actually) is the fact that there is no way to style an element while *another* element is interacted with. Consider the following SCSS, in which an image gets shown when its sibling text is hovered over.

```scss
.image {
  opacity: 0;
}

.text:hover {
  & ~ .image {
    opacity: 1;
  }
}
```

It is not possible to emulate this behavior with atomic classes alone, in fact, whenever we want to express relationships between certain elements, we have to deviate from the atomic CSS principle, by writing custom classes in our entry CSS file and applying those to our elements.

## Conclusion

Comparing TailwindCSS to plain CSS or even Sass/SCSS, you might question it's benefit. When did you last write plain CSS though? Modern projects often rely on complex, component-based architectures, for which appropriate styling methods have evolved, and have long reigned supreme in the space. When compared to *these* styling methods, it becomes clear why TailwindCSS has gained such a strong following over the past years.