import Head from 'next/head'
import Feed from 'rss-to-json'
import tinytime from 'tinytime'
import Link from 'next/link'

export async function getStaticProps() {
  const feed = await Feed.load('https://feeds.transistor.fm/full-stack-radio')
  console.log(feed.items[1])
  return {
    props: {
      episodes: feed.items.map(({ id, title, description, created, itunes_episode }) => ({
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
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-2xl mx-auto">
        <div className="flex space-x-8">
          <Link href="/">
            <a className="flex-shrink-0">
              <img className="h-36 w-36 rounded-lg object-cover" src="/podcast-cover.jpg" alt="" />
            </a>
          </Link>
          <div>
            <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              <Link href="/">
                <a>Full Stack Radio</a>
              </Link>
            </h1>
            <div className="mt-2">
              <p className="text-xl leading-7 text-gray-500">
                A podcast for developers interested in building great software products.
              </p>
            </div>
            <div className="mt-3">
              <p className="text-base text-gray-500">
                By <a href="https://twitter.com/adamwathan">Adam Wathan</a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10">
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
      </div>
    </div>
  )
}
