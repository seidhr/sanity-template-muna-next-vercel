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

export default function Index({ data, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
          <Header />
          {data.frontpage[0].content && <RenderSections sections={data.frontpage[0].content} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getFrontpage(preview)
  console.log(data)
  return {
    props: { data, preview },
  }
}
