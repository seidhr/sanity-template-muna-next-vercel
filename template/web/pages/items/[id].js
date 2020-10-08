import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import ItemImage from '../../components/item-image'
import { getAllMadeObjectsWithID, getMadeObject } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import PortableTextBlock from '../../components/portable-text-block'

/* const MiradorWithNoSSR = dynamic(
  () => import('../../components/mirador'),
  { ssr: false }
) */

export default function MadeObject({ item, preview }) {
  console.log(item)
  const router = useRouter()
  if (!router.isFallback && !item?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          "Loading…"
        ) : (
          <>
            <Header />
            <article>
              <Head>
                <title>
                  {item.label}
                </title>
              </Head>
              <h1 className="text-xl text-gray-900 leading-tight">
                {item.label}
              </h1>
              <ItemImage id={item.id} label={item.label} url={item.mainRepresentation} />
              {/* <MiradorWithNoSSR manifestData={item.mainRepresentation}/> */}
              {item?.referredToBy?.map(ref => (<PortableTextBlock blocks={ref.body} />))}
            </article>
          </>
        )}
      </Container>
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
