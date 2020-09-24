import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import ItemImage from '../../components/item-image'
import { getAllMadeObjectsWithID, getMadeObject } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'

export default function MadeObject({ item, preview }) {
  const router = useRouter()
  if (!router.isFallback && !item?._id) {
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
              <h1>
                {item.label}
              </h1>
              <ItemImage id={item.id} label={item.label} url={item.mainRepresentation} />
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
