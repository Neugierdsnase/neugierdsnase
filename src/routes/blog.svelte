<script lang="ts" context="module">
  import { metadata as compairingTailwindWithPlainCssIsWrongBlogPost } from './blog/comparing-tailwind-with-plain-css-is-wrong.md'
  import { metadata as yourNotJustLateForCryptoBlogPost } from './blog/youre-not-just-late-to-crypto.md'
  import { metadata as pythonsMostUnderratedGameEngineBlogPost } from './blog/pythons-most-underrated-game-engine.md'
  import { metadata as pythonsMostUnderratedGameEngine2BlogPost } from './blog/pythons-most-underrated-game-engine-2.md'
  import BlogpostCard from '../components/BlogpostCard/BlogpostCard.svelte'

  const blogPosts = [
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
  ].reverse()
</script>

<div
  class="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3"
>
  {#each blogPosts as metadata, index}
    <BlogpostCard {index} {metadata} />
  {/each}
</div>
