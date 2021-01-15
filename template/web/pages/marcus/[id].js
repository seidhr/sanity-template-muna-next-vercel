import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
// import { Box, Container, Heading, Text } from '@chakra-ui/react'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Head from 'next/head'
import {CMS_NAME} from '../../lib/constants'
import RenderDocument from '../../components/RenderDocument'
import { omit } from 'lodash'
import * as jsonld from 'jsonld'

export default function Document({data}) {
  const router = useRouter()
  console.log(data)
  if (!router.isFallback && !data.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Head>
        <title>{data?.label + ' | ' + CMS_NAME}</title>
      </Head>

      {router.isFallback ? (
        'Loading…'
      ) : (
        <>
          <Header />
          <main>{data && <RenderDocument document={data} />}</main>
        </>
      )}
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  const res = await getObject(params.id)
  const awaitData = await res.json()
  const awaitFramed = jsonld.frame(awaitData, frame);
  let framed = await awaitFramed
  console.log(framed)
  const data = omit(framed, ["@context"])
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data} || null, // will be passed to the page component as props
  }
}

async function getObject(id) {
  if(!id) {
    return error
  }

  const query = `
    PREFIX  dct:  <http://purl.org/dc/terms/>
    PREFIX  rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX  ubbont: <http://data.ub.uib.no/ontology/>
    PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX  dc:   <http://purl.org/dc/elements/1.1/>
    
    CONSTRUCT 
      { 
        ?s a ubbont:MadeObject .
        ?s ubbont:subjectOfManifest ?manifestURL .
        ?s dct:identifier ?id .
        ?s rdfs:label ?title .
        ?s ubbont:hasThumbnail ?thumb .
        ?s dct:description ?desc .
      }
    WHERE
      { GRAPH ?g
          { VALUES ?id { "${id}" }
            ?s  dct:identifier       ?id ;
                dct:title            ?title ;
                ubbont:hasThumbnail  ?thumb
            OPTIONAL
              { ?s  dct:description  ?desc }
            BIND(concat("https://marcus-manifest-api.vercel.app/api/iiif/manifest/", ?id) AS ?manifestURL)
          }
      }
  `

  const results = await fetch(`http://sparql.ub.uib.no/sparql/query?query=${encodeURIComponent(query)}&output=json`)

  return results
}

const frame = {
  "@context" : {
    "id": "@id",
    "_type": "@type",
    "value": "@value",
    "homepage" : {
      "@id" : "http://iiif.io/api/presentation/3#homepage",
      "@type" : "@id"
    },
    "label" : {
      "@id" : "http://www.w3.org/2000/01/rdf-schema#label"
    },
    "seeAlso" : {
      "@id": "http://www.w3.org/2000/01/rdf-schema#seeAlso",
      "@type" : "@id"
    },
    "madeObject" : {
      "@id" : "http://data.ub.uib.no/ontology/MadeObject",
      "@type" : "@id"
    },
    "hasThumbnail" : {
      "@id" : "http://data.ub.uib.no/ontology/hasThumbnail",
    },
    "subjectOfManifest" : {
      "@id" : "http://data.ub.uib.no/ontology/subjectOfManifest",
    },
    "description" : {
      "@id" : "http://purl.org/dc/terms/description"
    },
    "identifier" : {
      "@id" : "http://purl.org/dc/terms/identifier"
    },
    "sc" : "http://iiif.io/api/presentation/3#",
    "oa" : "http://www.w3.org/ns/oa#",
    "dct" : "http://purl.org/dc/terms/",
    "rdf" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "ubbont" : "http://data.ub.uib.no/ontology/",
    "rdfs" : "http://www.w3.org/2000/01/rdf-schema#",
    "dc" : "http://purl.org/dc/elements/1.1/"
  },
  "@type": "madeObject",
}