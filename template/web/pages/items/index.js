import { CMS_NAME } from '../../lib/constants'
import { getAllMadeObjects } from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Cards from '../../components/Cards'
import { Container } from '@chakra-ui/core'


export default function Items({ data, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
          <Header menu={data.navMenu}/>
          <Container maxW="xl">
            <Cards items={data.items} />
          </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const data = await getAllMadeObjects(preview)
  return {
    props: { data, preview },
  }
}
