import { CMS_NAME } from '../lib/constants'
import imageUrlBuilder from "@sanity/image-url";
import client from '../lib/sanity.js'
import { getFrontpage } from '../lib/api'
import Head from 'next/head'
import Layout from '../components/Layout'
import Header from '../components/Header'
import RenderSections from '../components/RenderSection';

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);
// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

export default function Index({ frontpage, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
          <Header />
          {frontpage.content && <RenderSections sections={frontpage.content} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const frontpage = await getFrontpage(preview)
  return {
    props: { frontpage, preview },
  }
}
