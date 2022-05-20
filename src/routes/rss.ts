import { blogPosts } from '../publishedBlogposts'
import type { BlogPostType } from '../types/BlogPost'
export const prerender = true

const headers = {
  'Cache-Control': `max-age=0, s-max-age=600`,
  'Content-Type': 'application/xml',
}

const renderFeed = (
  posts: BlogPostType[],
) => `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="http://blog.vomkonstant.in/rss" rel="self" type="application/rss+xml" />
    <title>Konstantin Kovar</title>
    <link>https://blog.vomkonstant.in</link>
    <description>Blog vom Konstantin</description>
    ${posts
      .map(
        ({
          title,
          published,
          slug,
          description,
          author,
        }) => `<item>
      <guid>https://blog.vomkonstant.in/blog/${slug}</guid>
      <title>${title}</title>
      <link>https://blog.vomkonstant.in/blog/${slug}</link>
      <author>${author.split('<')[1].split('>')[0]}</author>
      ${
        description
          ? `<description>${description}</description>`
          : ''
      }
      <pubDate>${new Date(
        published,
      ).toUTCString()}</pubDate>
      </item>`,
      )
      .join('')}
  </channel>
</rss>
  `

export const get = () => {
  const body = renderFeed(blogPosts)
  return {
    body,
    headers,
  }
}
