import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
// import { Box, Container, Heading, Text } from '@chakra-ui/core'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import {getIdPaths, getId, getType} from '../../lib/api'
import Head from 'next/head'
import {CMS_NAME} from '../../lib/constants'
import RenderDocument from '../../components/RenderDocument'

export default function Document({data, preview}) {
  const router = useRouter()
  if (!router.isFallback && !data.item.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Head>
        <title>{data.item?.label + ' | ' + CMS_NAME}</title>
      </Head>

      {router.isFallback ? (
        'Loading…'
      ) : (
        <>
          <Header menu={data.navMenu} />
          <main>{data.item && <RenderDocument document={data.item} />}</main>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({params, preview = false}) {
  const type = await getType(params.id, preview)
  console.log(type)
  const data = await getId(params.id, type, preview)
  return {
    props: {
      preview,
      data: data || null,
    },
  }
}

export async function getStaticPaths() {
  const all = await getIdPaths()
  return {
    paths:
      all?.map((item) => ({
        params: {
          id: item.id,
        },
      })) || [],
    fallback: true,
  }
}
