import { metadata as compairingTailwindWithPlainCssIsWrongBlogPost } from './routes/blog/comparing-tailwind-with-plain-css-is-wrong.md'
import { metadata as yourNotJustLateForCryptoBlogPost } from './routes/blog/youre-not-just-late-to-crypto.md'
import { metadata as pythonsMostUnderratedGameEngineBlogPost } from './routes/blog/pythons-most-underrated-game-engine.md'
import { metadata as pythonsMostUnderratedGameEngine2BlogPost } from './routes/blog/pythons-most-underrated-game-engine-2.md'
import { metadata as tailwindWithWebAssemblyYewBlogPost } from './routes/blog/tailwind-with-webassembly-yew.md'
import type { BlogPostType } from './types/BlogPost'

export const blogPosts: BlogPostType[] = [
  {
    ...pythonsMostUnderratedGameEngineBlogPost,
    slug: 'pythons-most-underrated-game-engine',
  },
  {
    ...pythonsMostUnderratedGameEngine2BlogPost,
    slug: 'pythons-most-underrated-game-engine-2',
  },
  {
    ...compairingTailwindWithPlainCssIsWrongBlogPost,
    slug: 'comparing-tailwind-with-plain-css-is-wrong',
  },
  {
    ...yourNotJustLateForCryptoBlogPost,
    slug: 'youre-not-just-late-to-crypto',
  },
  {
    ...tailwindWithWebAssemblyYewBlogPost,
    slug: 'tailwind-with-webassembly-yew',
  },
].reverse()
