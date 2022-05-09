<script lang="ts">
  import dayjs from 'dayjs'

  import { fly } from 'svelte/transition'
  import {
    TRANSITION_DELAY,
    TRANSITION_DURATION,
  } from './../../constants'
  export let index: number
  export let metadata
  const { title, published, illustration, slug } = metadata
</script>

<a
  in:fly={{
    y: 40,
    duration: TRANSITION_DURATION,
    delay: TRANSITION_DELAY + index * 100,
  }}
  out:fly={{
    y: -20,
    duration: TRANSITION_DURATION,
  }}
  href={`./blog/${slug}`}
>
  <article
    class="blogpost_card--hovereffect relative flex h-40 overflow-hidden border-8 border-stone-800"
  >
    <div
      class="hidden items-center justify-center p-8 lg:flex"
    >
      {@html illustration}
    </div>
    <div
      class="flex h-1/3 items-center self-center text-ellipsis pl-8 pr-4"
    >
      <h2 class="text-l font-bold">{title}</h2>
    </div>
    <span
      class="absolute bottom-1 right-1 font-serif text-xs font-bold italic"
      ><time datetime={published.toString()}>
        {dayjs(published).format('DD MMMM YY')}
      </time>
    </span>
  </article>
</a>
