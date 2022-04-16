<script lang="ts">
  import {
    TRANSITION_DELAY,
    TRANSITION_DURATION,
  } from './../../constants'
  import { fly } from 'svelte/transition'

  export let heading: string
  export let subheading: string = ''
</script>

<div class="flex h-52 flex-col items-center justify-center">
  <h1
    class="text-6xl"
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
      class="mt-8 font-serif text-xl italic"
      >{subheading}</subtitle
    >
  {/if}
</div>
