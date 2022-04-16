<script lang="ts">
  import { fly } from 'svelte/transition'
</script>

<nav class="mb-8 border-b-4 border-stone-700 py-4">
  <ul transition:fly class="flex justify-around">
    <li><a href="/">home</a></li>
    <li><a href="/blog">blog</a></li>
    <li><a href="/about">about</a></li>
  </ul>
</nav>
