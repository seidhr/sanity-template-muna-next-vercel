import { CMS_NAME } from '../lib/constants'
import { getFrontpage } from '../lib/api'
import Head from 'next/head'
import Layout from '../components/Layout'
import RenderSections from '../components/RenderSection';
import Header from '../components/Header';

export default function Index({ data, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header menu={data.frontpage.navMenu} />
        {data.frontpage.content && (
          <RenderSections sections={data.frontpage.content} />
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getFrontpage(preview)
  return {
    props: { data, preview },
  }
}
