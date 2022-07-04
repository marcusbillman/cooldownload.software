import type { NextPage } from 'next';
import Head from 'next/head';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sketchy link shortener | cooldownload.software</title>
        <meta name="description" content="Sketchy link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-200">
        <div className="container p-10 mx-auto">
          <h1>cooldownload.software</h1>
        </div>
      </header>

      <main>
        <div className="container p-10 mx-auto">
          <form
            action="/api/links"
            method="post"
            className="flex flex-col gap-8"
          >
            <div>
              <label htmlFor="targetUrl" className="block">
                Paste your long link
              </label>
              <input
                type="text"
                name="targetUrl"
                id="targetUrl"
                required
                className="block w-full bg-gray-200 p-4"
              />
            </div>
            <div>
              <label htmlFor="challenge" className="block">
                Challenge
              </label>
              <select
                name="challenge"
                id="challenge"
                defaultValue={'random'}
                required
              >
                <option value="random">Random</option>
              </select>
            </div>
            <div>
              <label htmlFor="theme" className="block">
                Theme
              </label>
              <select name="theme" id="theme" defaultValue={'default'} required>
                <option value="default">Default</option>
              </select>
            </div>
            <button type="submit" className="block bg-blue-500 text-white p-4">
              Shorten
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default HomePage;
