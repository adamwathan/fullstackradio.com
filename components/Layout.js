import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Layout({ children, meta: pageMeta }) {
  const router = useRouter()
  const meta = {
    title: 'Full Stack Radio',
    description:
      'A podcast for developers interested in building great software products. Hosted by Adam Wathan.',
    cardImage:
      'https://images.transistor.fm/file/transistor/images/social_images/site/5064/social-full-stack-radio.jpg',
    feed: 'https://feeds.transistor.fm/full-stack-radio',
    keywords: ['technology', 'software', 'web', 'development', 'product', 'startup'],
    ...pageMeta,
  }

  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <Head>
        <title>{meta.title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta content={meta.description} name="description" />
        <meta content={meta.keywords.join(', ')} name="keywords" />
        <meta property="og:url" content={`https://fullstackradio.com${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Full Stack Radio" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@fullstackradio" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Full Stack Radio"
          href={meta.feed}
        />
      </Head>
      <div className="relative max-w-2xl mx-auto">
        <div className="flex flex-col items-center space-y-8 sm:items-start sm:space-y-0 sm:flex-row sm:space-x-8">
          <Link href="/" className="flex-shrink-0">
            <span className="sr-only">Home</span>
            <img
              className="h-28 w-28 sm:h-36 sm:w-36 rounded-lg object-cover"
              src="/podcast-cover.jpg"
              alt=""
            />
          </Link>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              <Link href="/">
                Full Stack Radio
              </Link>
            </h1>
            <div className="mt-2">
              <p className="text-xl leading-7 text-gray-500">
                A podcast for developers interested in building great software products. Hosted by{' '}
                <a href="https://twitter.com/adamwathan">Adam Wathan</a>.
              </p>
            </div>
            <div className="mt-4 flex justify-center space-x-2 text-gray-400 sm:justify-start">
              <a
                className="text-gray-600 hover:text-gray-900"
                href="https://podcasts.apple.com/us/podcast/feed/id931714873"
              >
                Apple Podcasts
              </a>
              <span>{'•'}</span>
              <a
                className="text-gray-600 hover:text-gray-900"
                href="https://overcast.fm/itunes931714873"
              >
                Overcast
              </a>
              <span>{'•'}</span>
              <a
                className="text-gray-600 hover:text-gray-900"
                href="https://feeds.transistor.fm/full-stack-radio"
              >
                RSS
              </a>
            </div>
          </div>
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </div>
  )
}
