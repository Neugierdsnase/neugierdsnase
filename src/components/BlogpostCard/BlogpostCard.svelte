<script lang="ts">
  import { fly } from 'svelte/transition'
  import type { BlogpostType } from '../../types/blogpost'
  import {
    TRANSITION_DELAY,
    TRANSITION_DURATION,
  } from './../../constants'
  export let index: number
  export let blogPost: BlogpostType
  const { title, publishDate, slug, illustration } =
    blogPost
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
  href={slug}
>
  <article
    class="blogpost_card--hovereffect relative flex h-40 overflow-hidden border-8 border-stone-800"
  >
    <div class="bg-red-400" />
    <div
      class="flex h-1/3 items-center self-center text-ellipsis pl-8"
    >
      <h2 class="text-l font-bold">{title}</h2>
    </div>
    <span
      class="absolute bottom-1 right-1 font-serif text-xs font-bold italic"
      ><time datetime={publishDate.toString()}>
        {publishDate.format('DD MMMM YY')}
      </time>
    </span>
  </article>
</a>
