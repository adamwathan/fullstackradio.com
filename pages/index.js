import Head from 'next/head'
import Feed from 'rss-to-json'
import tinytime from 'tinytime'
import Link from 'next/link'
import Layout from '../components/Layout'

function normalizeSummary(summary) {
  if (!summary) return ''
  
  // Check if the summary contains HTML tags
  if (summary.includes('<p>') && summary.includes('</p>')) {
    // Extract the content of the first <p> tag
    const match = summary.match(/<p>(.*?)<\/p>/)
    if (match && match[1]) {
      // Return the content without any HTML tags
      return match[1].replace(/<[^>]*>/g, '')
    }
  }
  
  // Return the summary as-is if it's not in HTML format
  return summary
}

export async function getStaticProps() {
  const feed = await Feed.load('https://feeds.transistor.fm/full-stack-radio')

  return {
    props: {
      episodes: feed.items
        .slice(0, 10)
        .map(({ id, title, itunes_summary, created, itunes_episode }) => ({
          id,
          number: itunes_episode,
          title,
          description: normalizeSummary(itunes_summary),
          created,
        })),
    },
    revalidate: 1,
  }
}

const dateTemplate = tinytime('{MM} {DD}, {YYYY}')
const dateTimeTemplate = tinytime('{YYYY}-{Mo}-{DD}')

export default function Home({ episodes }) {
  const meta = {
    title: 'Full Stack Radio',
  }

  return (
    <Layout meta={meta}>
      <div className="mt-6 grid gap-12 border-t-2 border-gray-100 py-8">
        {episodes.map((episode) => {
          const date = new Date(episode.created)
          return (
            <div key={episode.id} className="relative">
              <p className="text-sm leading-5 text-gray-500">
                <time dateTime={dateTimeTemplate.render(date)}>{dateTemplate.render(date)}</time>
              </p>
              <div>
                <h2 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                  {episode.title}
                </h2>
                <p className="mt-3 text-base leading-6 text-gray-500">{episode.description}</p>
              </div>

              <div className="mt-3">
                <Link href={`/${episode.number}`}>
                  <a className="text-base leading-6 font-semibold text-teal-600 hover:text-teal-700 focus:outline-none focus:underline">
                    <span className="sr-only">{episode.title}</span>
                    Show notes
                    <span className="absolute inset-0"></span>
                  </a>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      <div className="grid gap-16 border-t-2 border-gray-100 py-10">
        <Link href="/all">
          <a className="text-base leading-6 font-semibold text-teal-600 hover:text-teal-700">
            All episodes &rarr;
          </a>
        </Link>
      </div>
    </Layout>
  )
}
