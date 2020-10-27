import { CMS_NAME } from '../../lib/constants'
import { getAllMadeObjects } from '../../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import { SimpleGrid } from '@chakra-ui/core'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Card from '../../components/Card'


export default function Items({ allItems, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
          <Header />
          <SimpleGrid 
            columns={[1,2,4,5]} 
            spacing={5}
            padding={5}
          >
            {allItems && allItems.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </SimpleGrid>
            
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
