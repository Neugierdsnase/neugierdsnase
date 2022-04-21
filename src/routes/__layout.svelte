<script lang="ts">
  import Nav from '../components/Nav/Nav.svelte'

  import '../app.css'

  let y: number
</script>

<svelte:head>
  <title>Konstantin Kovar</title>
</svelte:head>

<div
  class="mx-auto w-11/12 px-4 lg:w-2/3 xl:w-1/2 2xl:w-1/3"
>
  <Nav />
  <slot />
</div>
