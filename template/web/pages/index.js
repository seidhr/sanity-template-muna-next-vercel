import imageUrlBuilder from "@sanity/image-url";
import client from '../lib/sanity.js'
import Container from '../components/container'
import Layout from '../components/layout'
import Header from '../components/header'
import ItemImage from '../components/item-image'
import { getAllMadeObjectsWithID } from '../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import { CMS_NAME } from '../lib/constants'

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
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Header />
          {allItems && allItems.map((item, index) => (
            <p key={index}>
              <ItemImage id={item.id} label={item.label} url={item.mainRepresentation} />
              <Link href={`items/${item.id}`}>{item.label}</Link>
            </p>
          ))}
        </Container>
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
