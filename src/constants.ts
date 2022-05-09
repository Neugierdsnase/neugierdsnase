import dayjs from 'dayjs'
import type { BlogpostType } from './types/blogpost'

export const TRANSITION_DURATION = 240
export const TRANSITION_DELAY = 250

const generateBlogpostSlug = (s: string) => `/blog/${s}`

export const BLOGPOSTS: BlogpostType[] = [
  {
    title: "Comparing TailwindCSS with plain CSS is wrong",
    slug: generateBlogpostSlug('comparing-tailwind-with-plain-css-is-wrong.md'),
    publishDate: dayjs('2022-05-09'),
  }
]
