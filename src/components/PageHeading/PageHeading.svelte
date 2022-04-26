<script lang="ts">
  import {
    TRANSITION_DELAY,
    TRANSITION_DURATION,
  } from './../../constants'
  import { fly } from 'svelte/transition'

  export let heading: string
  export let subheading: string = ''
</script>

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
    {heading}
  </h1>
  {#if Boolean(subheading)}
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
      >{subheading}</subtitle
    >
  {/if}
</div>
