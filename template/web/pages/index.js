import { CMS_NAME } from '../lib/constants'
import { getFrontpage } from '../lib/api'
import Head from 'next/head'
import Layout from '../components/Layout'
import RenderSections from '../components/RenderSection';

export default function Index({ data, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
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
