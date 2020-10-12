import { CMS_NAME } from '../../lib/constants'
import imageUrlBuilder from "@sanity/image-url";
import client from '../../lib/sanity.js'
import { getAllMadeObjectsWithID } from '../../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import { SimpleGrid } from '@chakra-ui/core'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Card from '../../components/Card'

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);
// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source);
}

export default function Index({ allItems, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
          <Header />
          <SimpleGrid 
            columns={4} 
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
  const allItems = await getAllMadeObjectsWithID(preview)
  return {
    props: { allItems, preview },
  }
}
