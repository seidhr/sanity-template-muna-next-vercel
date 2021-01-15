import {CMS_NAME} from '../../lib/constants'
import {getAllConcepts} from '../../lib/api'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import {Container, Heading, Text} from '@chakra-ui/react'
import Link from '../../components/Link'

export default function Concepts({data, preview}) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>

        <Header />

        <Container maxW="xl">
          <Heading>Demo - SSR med data fra sparql.ub.uib.no</Heading>
          <Text>Sjekk ut ubb-ms-0149-01, eller hvilken som helst annen id eller signatur.</Text>
          <Link href="marcus/ubb-ms-0149-01">ubb-ms-0149-01</Link>
          <Text>NB! Ikke en header nav meny her siden meny er i Sanity og ikke i sparql-endpoint. Noe å finne ut av :-).</Text>
        </Container>
      </Layout>
    </>
  )
}
