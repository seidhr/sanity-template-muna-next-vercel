import { imageBuilder } from '../../lib/sanity'
import { CMS_NAME } from '../../lib/constants'
import { getAllActors } from '../../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import { Grid, Avatar, Box, Heading, Flex, Badge } from '@chakra-ui/core'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Card from '../../components/Card'
import PortableTextBlock from '../../components/PortableTextBlock'


export default function Actors({ items, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header />
      <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6} p="10">
        {items && items.map((item) => (
          <Flex key={item.id}>
            <Avatar size="xl" name={item.label} src={imageBuilder.image(item.mainRepresentation).height('200').width('200').url()} />
            <Box p={5}>
              <Heading size="md">
                <Link href={`/id/${item.id}`}><a>{item.label}</a></Link>
              </Heading>
              <Box d="flex" alignItems="baseline">
                {item.hasType && item.hasType.map(type => (
                  <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
                    {type.label?.nor}
                  </Badge>)
                )}
                {!item.hasType && (
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    Person
                  </Badge>
                )}
              </Box>
              
              {item?.referredToBy?.map(ref => (
                <PortableTextBlock blocks={ref.body} />
              ))}
            </Box>
          </Flex>
        ))}
      </Grid>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const items = await getAllActors(preview)
  return {
    props: { items, preview },
  }
}
