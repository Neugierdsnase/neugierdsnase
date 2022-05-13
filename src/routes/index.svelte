<script lang="ts">
  import PageHeading from '../components/PageHeading/PageHeading.svelte'
  import '../app.css'
  import Article from '../components/Article/Article.svelte'
</script>

<div class="relative">
  <PageHeading
    headings={['Konstantin Kovar', 'about']}
    subheadings={[
      'react and web developer',
      'staying up to date in web development',
    ]}
    illustration={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250"><path fill-rule="evenodd" d="M185.675 46.273c-32.503-25.58-79.394-22.583-110.702-3.47-53.957 32.945-60.956 115.18-22.416 152.203 42.497 40.82 100.5 30.983 129.405 4.867 37.464-33.849 53.478-89.58 21.23-131.092" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" stroke-width="13.889" d="M185.675 46.273c-32.503-25.58-79.394-22.583-110.702-3.47-53.957 32.945-60.956 115.18-22.416 152.203 42.497 40.82 100.5 30.983 129.405 4.867 37.464-33.849 53.478-89.58 21.23-131.092"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" stroke-width="13.889" d="M99.603 99.651c-.843 5.193-1.192 10.54-1.326 15.8m47.817-17.26c.037 6.272.426 12.819-.2 19.083m-70.975 26.4c1.556 5.838 5.033 10.947 9.286 15.15 20.86 20.61 59.813 14.17 74.681-10.707"/></svg>`}
  />
</div>
<Article>
  <p>
    Web development is fascinating. As an information
    platform, the web is unique in many ways. It is open to
    anyone and owned by no one (or so the idea). As a
    result, it is filled with wonderful things in some
    parts, and disgusting, horrid and despicable things in
    others.
  </p>

  <p>
    From a technical perspective, it is an extremely diverse
    domain, since the technologies that power it, run on a
    myriad of devices. Your PC, of course, your phone,
    unsurprisingly, but maybe also on your TV, your coffee
    machine, your watch, your fridge and in your car.
  </p>

  <p>
    On the other hand, web development is relatively easy to
    get started with. A lot of people's first contact with
    the world of programming - wherever they might end up in
    it - is by learning HTML, CSS and JavaScript.
  </p>

  <p>
    This blog documents the story of me - Konstantin - a
    self-taught developer, navigating the wild,
    unpredictable, ever-changing waters of modern web dev
    and trying to stay on its bleeding edge.
  </p>
</Article>
