import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess(),
    mdsvex({ extensions: ['.md'], layout: "./src/components/BlogPostLayout.svelte" }),
  ],  
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: adapter(),
    prerender: { default: true },
  },
}

export default config
