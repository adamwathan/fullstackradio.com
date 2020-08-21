import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-2xl mx-auto">
        <div className="flex flex-col items-center space-y-8 sm:space-y-0 sm:flex-row sm:space-x-8">
          <Link href="/">
            <a className="flex-shrink-0">
              <img
                className="h-28 w-28 sm:h-36 sm:w-36 rounded-lg object-cover"
                src="/podcast-cover.jpg"
                alt=""
              />
            </a>
          </Link>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              <Link href="/">
                <a>Full Stack Radio</a>
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
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
