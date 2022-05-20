<script lang="ts">
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<article
  class="prose prose-stone mx-auto mt-4 translate-y-96 prose-code:font-mono prose-code:text-lg prose-code:font-normal before:prose-code:hidden after:prose-code:hidden xl:prose-xl 2xl:prose-2xl"
  style={`transform: ${
    y > 450 ? 'translate(0px)' : `translateY(${450 - y}px)`
  };`}
>
  <slot />
</article>
