<script context="module">
  export const prerender = true
</script>

<script lang="ts">
  import Article from '../components/Article/Article.svelte'
  import PageHeading from '../components/PageHeading/PageHeading.svelte'
  export let title
  export let alternateTitle
  export let subtitle
  export let alternateSubtitle
  export let illustration
</script>

<svelte:head>
  <title>Blog | Konstantin Kovar</title>
</svelte:head>

<PageHeading
  headings={[title, alternateTitle]}
  subheadings={[subtitle, alternateSubtitle]}
  {illustration}
/>
<Article>
  <slot />
</Article>
