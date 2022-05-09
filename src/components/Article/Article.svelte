<script lang="ts">
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<article
  class="prose mx-auto mt-4 xl:prose-xl 2xl:prose-2xl"
  style={`transform: ${
    y < 450 ? `translateY(${450 - y}px)` : 'translate(0px)'
  };`}
>
  <slot />
</article>
