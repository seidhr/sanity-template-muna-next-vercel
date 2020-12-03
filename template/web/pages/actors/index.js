import {imageBuilder} from '../../lib/sanity'
import {CMS_NAME} from '../../lib/constants'
import {getAllActors} from '../../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import {Grid, Avatar, Box, Heading, Flex, Badge, Container} from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Card from '../../components/Card'
import PortableTextBlock from '../../components/PortableTextBlock'

export default function Actors({data, preview}) {
  /* let actors = data.items.reduce((r, e) => {
    // get first letter of name of current element
    let group = e.label[0];
    // if there is no property in accumulator with this letter create it
    if(!r[group]) r[group] = {group, children: [e]}
    // if there is push current element to children array for that letter
    else r[group].children.push(e);
    // return accumulator
    return r;
  }, {})
  
  // since data at this point is an object, to get array of values
  // we use Object.values method
  let result = Object.values(actors) */

  return (
    <Layout preview={preview}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Header menu={data.defaultNavMenu} />

      <Container maxW="xl">
        <Heading>Aktører</Heading>
      </Container>

      <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6} p="10">
        {data.items &&
          data.items
            .filter((item) => item.count > 0)
            .map((item) => (
              <Flex key={item.id}>
                <Avatar
                  size="lg"
                  name={item.label}
                  src={imageBuilder.image(item.mainRepresentation).height('200').width('200').url()}
                />
                <Box p={2}>
                  <Heading size="md">
                    <Link href={`/id/${item.id}`}>
                      <a>{item.label}</a>
                    </Link>
                  </Heading>
                  <Box d="flex" alignItems="baseline">
                    {item.hasType &&
                      item.hasType.map((type) => (
                        <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
                          {type.label?.nor}
                        </Badge>
                      ))}

                    {!item.hasType && (
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        Person
                      </Badge>
                    )}

                    {item.referredToBy?.map((ref) => (
                      <PortableTextBlock blocks={ref.body} />
                    ))}
                  </Box>
                </Box>
              </Flex>
            ))}
      </Grid>
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getAllActors(preview)
  return {
    props: {data, preview},
  }
}
