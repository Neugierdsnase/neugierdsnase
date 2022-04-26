<script lang="ts">
  import Nav from '../components/Nav/Nav.svelte'

  import '../app.css'
  import Footer from '../components/Footer/Footer.svelte'

  let y: number
</script>

<svelte:head>
  <title>Konstantin Kovar</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<div class="min-h-[170vh]">
  <div
    class="left-0 right-0"
    style={`position: ${
      y > 450 ? 'relative' : 'fixed'
    }; transform: ${
      y > 450 ? 'translateY(450px)' : 'translate(0px)'
    };`}
  >
    <div
      class="relative mx-auto w-11/12 lg:w-2/3 xl:w-1/2 2xl:w-1/3"
    >
      <Nav />
      <slot />
    </div>
    <Footer />
  </div>
</div>
