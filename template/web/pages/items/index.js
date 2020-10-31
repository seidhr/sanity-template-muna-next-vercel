import { CMS_NAME } from '../../lib/constants'
import { getAllMadeObjects } from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Cards from '../../components/Cards'


export default function Items({ allItems, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
          <Header menu={allItems.navMenu}/>
          <Cards items={allItems} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allItems = await getAllMadeObjects(preview)
  return {
    props: { allItems, preview },
  }
}
