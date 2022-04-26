<script lang="ts">
  import Footer from '../../components/Footer/Footer.svelte'
</script>

<svelte:head>
  <title>Blog | Konstantin Kovar</title>
</svelte:head>

<article class="prose prose-stone">
  <slot />
</article>
<Footer />
