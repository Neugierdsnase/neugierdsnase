# Comparing TailwindCSS with plain CSS is wrong

A year ago I was teaching web development students about the various approaches to writing and organising CSS, which is notoriously hard to maintain, in it's "natural" form. Among the things I was showing was a brief mention of the "atomic CSS"-approach and the fact that TailwindCSS had gained a considerable amount of steam over the last few years. Back then, I was playinf it down as a fad, telling them I didn't understand what all the fuss was about, basically telling them it was unjustified hype.

Fast forward to this semester, when I taught the same course to another class. My view had changed. I told my students, that I now believe there are good chances TailwindCSS will dominate the space for years to come, similar to how Bootstrap had been doing in the mid-2000s.

## Plain CSS is not Tailwind's competition

So what changed? During the months in-between I had realized, that the issues I had with Tailwind were invalid. I was comparing it to plain CSS, even though I had not been writing plain CSS - or even SCSS, Less, etc. - outside of my teaching engagements for quite literally *years*.

## What Tailwind is actually up against

Joining a ReactJS-legacy project you will quite likely find a stack similar to this: 

1. TypeScript
1. NextJS
1. React (duh)
1. Artefacts of a past Redux integration ("we tried to delete it, but when we do it breaks and we don't know why")
1. styled-components or emotionJS
1. styled-system

Let's focus on the last two points. These have likely been integrated, because keeping extra CSS files for every React component quickly becomes unmaintainable with a growing project. So a decision was made to keep the styles within the component files. Eventually, it turned out to be cumbersome writing a stylesheet for every component in your application. To the rescue comes styled-system, which provides you with reusable components using inline styles via props, comprehensive theming functionality and an intriguingly simple way to write responsive styles.

## Performance-gore

None of this comes without a cost. The whole convoluted sentence you just decided not to read, is computed *at runtime* and believe me when I tell you, a peek under styled-systems hood reveals some treacherous ceveats.

So what if we couls have all of that power, but none of that runtime overhead? Sounds too good to be true? Well, let's take a look how we would replace styled-system code with TailwindCSS in this simple example.

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

These are six props that need to be computed at runtime by the browsers JavaScript interpreter. If we would use Tailwind, this code would be to the same effect:

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

As we can see, the ideas at play are the same. In both examples we use both 

* values defined in our theme/config for the padding and 
* arbitrary values that are presumably at this single spot for the positioning and width.

## Responsiveness

Let's take a look at responsive styling. I will just show single lines for brevity. This is how you might change a components margin depending on screen size in styled-system.

```tsx
  m={{sm: '4px', md: '8px', lg: '16px'}}
```

Easy enough, but note that additionally to everything else discussed above, the passed in object gets created every time this component re-renders. *(Strictly speaking, this is a constant value, that should be moved out of the component entirely, defeating the whole point of readable responsive code.)*

On the other hand, doing the same thing in Tailwind looks very similar, but doesn't require extra computing when running in the browser:

```tsx
  className="sm:m-1 md:m-2 lg:m-4"
```

## Going even deeper

