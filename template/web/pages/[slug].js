import { CMS_NAME } from '../lib/constants'
import { getRouteBySlug, getRoutes } from '../lib/api'
import Head from 'next/head'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Sections from '../components/Sections/Sections'

export default function Page({ data, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>

        <Header menu={data.page.navMenu} />

        {data.page.content && <Sections sections={data.page.content} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getRouteBySlug(params.slug, preview)
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
    fallback: false,
  }
}
