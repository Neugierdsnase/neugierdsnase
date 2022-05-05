<script lang="ts">
  import PageHeading from '../components/PageHeading/PageHeading.svelte'
  import '../app.css'

  let y: number
</script>

<svelte:window bind:scrollY={y} />

<div class="relative h-52 overflow-hidden">
  <PageHeading
    heading={y < 120 ? 'Konstantin Kovar' : 'about'}
    subheading={y < 120
      ? 'react and web developer'
      : 'staying up to date in web development'}
  />
  {#if y < 450}
    <div
      class="absolute top-0 right-0 bg-stone-800"
      style={`width: ${y * 0.8}%; height: ${404 - y}px`}
    />
  {/if}
</div>
<article
  class="prose mx-auto mt-4 xl:prose-xl 2xl:prose-2xl"
  style={`transform: ${
    y < 450 ? `translateY(${450 - y}px)` : 'translate(0px)'
  };`}
>
  <p>
    We development is fascinating. As an information
    platform, the web is unique in many ways. It is open for
    anyone and owned by noone (or so the idea). As a result,
    it is filled with wonderful things in some parts, and
    absolutely digusting and horrid things in others.
  </p>

  <p>
    From a technical perspective, it is an extremely fiverse
    domain, since the technologies that power it, run on a
    myriad of devices. Your PC, of course, your phone,
    unsurprisingly, but maybe also on your TV, your coffee
    machine, your watch, your fridge and in your car.
  </p>

  <p>
    On the other hand, web development is relatively easy to
    get started with. A lot of people's first contact with
    the world of programming - whereever they might up in it
    - is by learning HTML, CSS and JavaScript.
  </p>

  <p>
    This blog documents the story of me - Konstantin - a
    self-taught developer, navigating the wild,
    unpredictable, ever-changing waters of modern webdev and
    trying to stay on it's bleeding edge.
  </p>
</article>
