import Head from 'next/head'
import Feed from 'rss-to-json'
import tinytime from 'tinytime'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export async function getStaticProps({ params }) {
  const feed = await Feed.load('https://feeds.transistor.fm/full-stack-radio')

  return {
    props: {
      episode: feed.items
        .map(({ id, url, title, content, created, itunes_episode, itunes_summary }) => ({
          id,
          embed: url.replace('.fm/s', '.fm/e') + '/dark',
          number: itunes_episode,
          title,
          description: itunes_summary,
          content,
          created,
        }))
        .find(({ number }) => number === params.episode),
    },
    revalidate: 3,
  }
}

export async function getStaticPaths() {
  const feed = await Feed.load('https://feeds.transistor.fm/full-stack-radio')

  return {
    paths: feed.items.map(({ itunes_episode }) => ({
      params: {
        episode: itunes_episode,
      },
    })),
    fallback: true,
  }
}

const dateTemplate = tinytime('{MM} {DD}, {YYYY}')
const dateTimeTemplate = tinytime('{YYYY}-{Mo}-{DD}')

export default function Home({ episode }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p class="text-2xl leading-8 font-semibold text-gray-900">Loading...</p>
      </div>
    )
  }

  const date = new Date(episode.created)
  const meta = {
    title: `${episode.title}`,
    description: episode.description,
  }

  return (
    <Layout meta={meta}>
      <Head>
        <title>{episode.title} &middot; Full Stack Radio</title>
      </Head>
      <div className="border-t-2 border-gray-100 pt-8">
        <div>
          <p className="text-sm leading-5 text-gray-500">
            <time dateTime={dateTimeTemplate.render(date)}>{dateTemplate.render(date)}</time>
          </p>
          <div>
            <h2 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
              <Link href={`/${episode.number}`}>
                <a>{episode.title}</a>
              </Link>
            </h2>
            <p className="mt-3 text-base leading-6 text-gray-600">{episode.description}</p>

            <iframe
              className="my-8"
              width="100%"
              height="180"
              frameBorder="no"
              scrolling="no"
              seamless
              src={episode.embed}
            ></iframe>

            <div className="mt-4 prose" dangerouslySetInnerHTML={{ __html: episode.content }} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
