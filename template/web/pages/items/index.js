import {CMS_NAME} from '../../lib/constants'
import {getAllMadeObjects} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Cards from '../../components/Cards'
import {Box, Container} from '@chakra-ui/react'

export default function Items({data, preview}) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header menu={data.defaultNavMenu} />          
        <Box maxW="full">
          <Cards items={data.items} />
        </Box>
      </Layout>
    </>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getAllMadeObjects(preview)
  return {
    props: {data, preview},
  }
}
