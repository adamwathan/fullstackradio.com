import Head from 'next/head'
import Feed from 'rss-to-json'
import tinytime from 'tinytime'
import Link from 'next/link'
import Layout from '../components/Layout'

export async function getStaticProps() {
  const feed = await Feed.load('https://feeds.transistor.fm/full-stack-radio')

  return {
    props: {
      episodes: feed.items
        .slice(0, 10)
        .map(({ id, title, description, created, itunes_episode }) => ({
          id,
          number: itunes_episode,
          title,
          description,
          created,
        })),
    },
  }
}

const dateTemplate = tinytime('{MM} {DD}, {YYYY}')

export default function Home({ episodes }) {
  return (
    <Layout>
      <Head>
        <title>Full Stack Radio</title>
      </Head>
      <div className="mt-6 grid gap-16 border-t-2 border-gray-100 py-10">
        {episodes.map((episode) => {
          const date = new Date(episode.created)
          return (
            <div key={episode.id}>
              <p className="text-sm leading-5 text-gray-500">
                <time dateTime="2020-03-16">{dateTemplate.render(date)}</time>
              </p>
              <div>
                <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                  <Link href="/[episode].js" as={`/${episode.number}`}>
                    <a>{episode.title}</a>
                  </Link>
                </h3>
                <p className="mt-3 text-base leading-6 text-gray-500">{episode.description}</p>
              </div>

              <div className="mt-3">
                <a
                  href="/"
                  className="text-base leading-6 font-semibold text-teal-500 hover:text-teal-700"
                >
                  Show notes
                </a>
              </div>
            </div>
          )
        })}
      </div>
      <div className="grid gap-16 border-t-2 border-gray-100 py-10">
        <Link href="/all">
          <a className="text-base leading-6 font-semibold text-teal-500 hover:text-teal-700">
            All episodes &rarr;
          </a>
        </Link>
      </div>
    </Layout>
  )
}
