import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sketchy link shortener | cooldownload.software</title>
        <meta name="description" content="Sketchy link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div className="container max-w-4xl flex flex-col gap-24 p-4 mx-auto">
          <section className="mt-12">
            <h1 className="text-3xl font-bold mb-4">Make your links sketchy</h1>
            <p>
              Mess with your friends by sending them questionable links.
              <br />
              <span className="text-gray-500 italic">Example: </span>
              <span className="text-gray-500 italic underline">
                cooldownload.software/credit-card-loans/microsoft-supportcall.docx?Xsw6k=hg
              </span>
            </p>
          </section>
          <section>
            <form
              action="/api/links"
              method="post"
              className="flex flex-col gap-8"
            >
              <div>
                <label htmlFor="targetUrl" className="block font-medium mb-2">
                  Paste your normal link
                </label>
                <input
                  type="text"
                  name="targetUrl"
                  id="targetUrl"
                  placeholder="https://marcusbillman.com"
                  required
                  className="block w-full border border-gray-200 px-4 py-3 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-4">
                <div className="w-full">
                  <label
                    htmlFor="challenge"
                    className="block  font-medium mb-2"
                  >
                    Select challenge
                  </label>
                  <select
                    name="challenge"
                    id="challenge"
                    defaultValue={'random'}
                    required
                    className="block w-full border border-gray-200 px-4 py-3 rounded-lg"
                  >
                    <option value="random">Random</option>
                    <option value="wait">Wait</option>
                    <option value="3d-text">3D text</option>
                    <option value="rotate-image">Rotate image</option>
                    <option value="select-squares">Select squares</option>
                  </select>
                </div>
                <div className="w-full">
                  <label htmlFor="theme" className="block font-medium mb-2">
                    Select theme
                  </label>
                  <select
                    name="theme"
                    id="theme"
                    defaultValue={'default'}
                    required
                    className="block w-full border border-gray-200 px-4 py-3 rounded-lg"
                  >
                    <option value="default">Default</option>
                  </select>
                </div>
              </div>
              <Button htmlButtonType="submit">Create sketchy link</Button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
