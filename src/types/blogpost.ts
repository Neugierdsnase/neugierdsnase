import type { Dayjs } from 'dayjs'

export type BlogpostType = {
  title: string
  subtitle?: string
  slug: string
  publishDate: Dayjs
  illustration?: string
}
