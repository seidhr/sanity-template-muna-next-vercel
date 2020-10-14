import { CMS_NAME } from '../lib/constants'
import imageUrlBuilder from "@sanity/image-url";
import client from '../lib/sanity.js'
import { getRouteBySlug, getRoutes } from '../lib/api'
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
          {data[0].page.content && <RenderSections sections={data[0].page.content} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getRouteBySlug(params.slug, preview)
  console.log(data)
  return {
    props: { data, preview },
  }
}

export async function getStaticPaths() {
  const routes = await getRoutes()
  return {
    paths:
      routes?.map((item) => ({
        params: {
          slug: item.slug.current,
        },
      })) || [],
    fallback: true,
  }
}
