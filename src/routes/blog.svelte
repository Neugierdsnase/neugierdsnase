<script lang="ts">
  import BlogpostCard from '../components/BlogpostCard/BlogpostCard.svelte'

  import { BLOGPOSTS } from '../constants'
  import type { BlogpostType } from '../types/blogpost'

  const blogPosts: BlogpostType[] = BLOGPOSTS
</script>

<div
  class="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3"
>
  {#each blogPosts as blogPost, index}
    <BlogpostCard {index} {blogPost} />
  {/each}
</div>
