<script lang="ts" context="module">
  import { metadata as compairingTailwindWithPlainCssIsWrongBlogPost } from './blog/comparing-tailwind-with-plain-css-is-wrong.md'
  import { metadata as yourNotJustLateForCryptoBlogPost } from './blog/youre-not-just-late-to-crypto.md'
  import BlogpostCard from '../components/BlogpostCard/BlogpostCard.svelte'

  const blogPosts = [
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
