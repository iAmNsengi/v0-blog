export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Built with Next.js & BaseHub.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Next.js Docs
            </a>
            <a
              href="https://basehub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 font-bold hover:underline text-blue-600"
            >
              BaseHub CMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
