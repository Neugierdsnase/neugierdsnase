<script lang="ts">
  import type { NavRoute } from '../../types/NavRoute'

  export let route: NavRoute
  const { path, label } = route
</script>

<li>
  <a href={path}>
    <div
      class="w-36 rounded py-2 text-center transition-colors hover:bg-stone-600 hover:text-stone-200"
    >
      {label}
    </div>
  </a>
</li>
