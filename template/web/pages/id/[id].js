import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import { Box, Container, Heading, Text } from '@chakra-ui/core'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import ItemImage from '../../components/ItemImage'
import { getAllMadeObjectsWithID, getMadeObject } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import PortableTextBlock from '../../components/portable-text-block'

/* const MiradorWithNoSSR = dynamic(
  () => import('../../components/mirador'),
  { ssr: false }
) */

export default function MadeObject({ item, preview }) {
  const router = useRouter()
  if (!router.isFallback && !item?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Head>
        <title>
          {item.label + ' | ' + CMS_NAME}
        </title>
      </Head>

      {router.isFallback ? (
        "Loading…"
      ) : (
        <>
          <Header />
          <main>
            <Container maxW="xl" centerContent>
              <Heading>
                {item.label}
              </Heading>

              <ItemImage 
                id={item.id} 
                label={item.label}
                 url={item.mainRepresentation} />

              {/* <MiradorWithNoSSR manifestData={item.mainRepresentation}/> */}
              
              {item?.referredToBy?.map(ref => (
                <Box maxW="lg">
                  <Text fontSize="lg">
                    <PortableTextBlock blocks={ref.body} />
                  </Text>
                </Box>
              ))}
            </Container>
          </main>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getMadeObject(params.id, preview)
  return {
    props: {
      preview,
      item: data[0] || null,
    },
  }
}

export async function getStaticPaths() {
  const allItems = await getAllMadeObjectsWithID()
  return {
    paths:
      allItems?.map((item) => ({
        params: {
          id: item.id,
        },
      })) || [],
    fallback: true,
  }
}
