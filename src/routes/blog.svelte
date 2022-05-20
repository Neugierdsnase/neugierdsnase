<script lang="ts" context="module">
  import { blogPosts } from '../publishedBlogposts'

  import BlogpostCard from '../components/BlogpostCard/BlogpostCard.svelte'
</script>

<div
  class="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3"
>
  {#each blogPosts as metadata, index}
    <BlogpostCard {index} {metadata} />
  {/each}
</div>
