<script>
  import Nav from '../components/Nav/Nav.svelte'

  import '../app.css'
  import Footer from '../components/Footer/Footer.svelte'
</script>

<svelte:head>
  <title>Konstantin Kovar</title>
</svelte:head>

<div
  class="mx-auto min-h-[110vh] px-4 md:w-3/4 md:px-0 lg:w-2/3 xl:w-1/2 2xl:w-1/3"
>
  <Nav />
  <slot />
  <Footer />
</div>
