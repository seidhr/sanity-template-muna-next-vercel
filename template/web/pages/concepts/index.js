import {CMS_NAME} from '../../lib/constants'
import {getAllConcepts} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import {Container, List, ListItem} from '@chakra-ui/react'
import Link from '../../components/Link'

export default function Concepts({data, preview}) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>

        <Header menu={data.defaultNavMenu} />

        <Container maxW="xl">
          {data.items && (
            <List>
              {data.items
                .filter((item) => item.count > 0)
                .map((item) => (
                  <ListItem key={item._id}>
                    <Link href={`/id/${item._id}`}>{item.label.nor}</Link> <span>{item.count}</span>
                  </ListItem>
                ))}
            </List>
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getAllConcepts(preview)
  return {
    props: {data, preview},
  }
}
