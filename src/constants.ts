import dayjs from 'dayjs'
import type { BlogpostType } from './types/blogpost'

export const TRANSITION_DURATION = 240
export const TRANSITION_DELAY = 250

const generateBlogpostSlug = (s: string) => `/blog/${s}`

export const BLOGPOSTS: BlogpostType[] = []
