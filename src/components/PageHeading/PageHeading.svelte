<script lang="ts">
  import base64 from 'base-64'
  import {
    TRANSITION_DELAY,
    TRANSITION_DURATION,
  } from './../../constants'
  import { fly } from 'svelte/transition'

  export let headings: [string, string | undefined]
  export let subheadings: [
    string | undefined,
    string | undefined,
  ] = [undefined, undefined]
  export let illustration: string | undefined = undefined
  let y: number
</script>

<svelte:window bind:scrollY={y} />

<div class="relative h-52 overflow-hidden">
  <div class="relative my-4 h-52 w-full text-center">
    <h1
      class="mb-8 text-6xl"
      in:fly={{
        y: 40,
        duration: TRANSITION_DURATION,
        delay: TRANSITION_DELAY,
      }}
      out:fly={{
        y: -20,
        duration: TRANSITION_DURATION,
      }}
    >
      {y > 120 ? headings[1] || '' : headings[0] || ''}
    </h1>
    {#if subheadings.some(Boolean)}
      <subtitle
        in:fly={{
          y: 20,
          duration: TRANSITION_DURATION,
          delay: TRANSITION_DELAY + 250,
        }}
        out:fly={{
          y: -20,
          duration: TRANSITION_DURATION,
        }}
        class="font-serif text-xl italic"
        >{y > 120
          ? subheadings[1] || ''
          : subheadings[0] || ''}</subtitle
      >
    {/if}
  </div>
  {#if y < 450}
    <div
      class="absolute top-0 right-0 bg-stone-800"
      style={`width: ${y * 0.8}%; height: ${404 - y}px`}
    />
  {/if}
</div>
<div
  class="relative h-80 bg-contain bg-center bg-no-repeat text-red-500"
  style={`background-image: url("data:image/svg;base64,${base64.encode(
    illustration,
  )}"`}
/>
