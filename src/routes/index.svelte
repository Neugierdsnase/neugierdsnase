<script lang="ts">
  import PageHeading from '../components/PageHeading/PageHeading.svelte'
  import '../app.css'
  import Article from 'src/components/Article/Article.svelte'
</script>

<div class="relative h-52 overflow-hidden">
  <PageHeading
    headings={['Konstantin Kovar', 'about']}
    subheadings={[
      'react and web developer',
      'staying up to date in web development',
    ]}
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
