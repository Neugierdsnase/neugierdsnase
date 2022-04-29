<script lang="ts">
  import { fly } from 'svelte/transition'
  import { navRoutes } from '../../navRoutes'
  import NavItem from './NavItem.svelte'
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<nav class="mx-auto mb-8 border-b-4 border-stone-700 py-4">
  <ul transition:fly class="flex justify-around">
    {#each navRoutes as route}
      <NavItem {route} />
    {/each}
  </ul>
</nav>
