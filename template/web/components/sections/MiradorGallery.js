import dynamic from 'next/dynamic'
import { Grid, Container, Box, Center, Heading, Text } from '@chakra-ui/core'
import styles from './PageHeader.module.css'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(
  () => import('../Mirador'),
  { ssr: false }
)

export default function MiradorGallery(props) {

  if(!props) {
    return null
  }

  const manifests = props.items.map(item => item.manifest)

  return (
    <Grid 
      w="full"
      p={5}
      gridGap={5}
      alignContent= "start"
      gridTemplateAreas={{ xl: `"image image metadata"`, base: `"image" "metadata"`}}
      gridTemplateColumns={{ xl: "1fr 1fr 1fr", base: "1fr" }}
    >
      <Container w="4xl" gridArea="metadata">
        <Heading mb={10}>
          {props.heading}
        </Heading>

        {props?.description && (
          <Box w="4xl">
            <PortableTextBlock blocks={props.description} />
          </Box>
        )}
      </Container>

      {manifests && (
        <Box gridArea="image">
          <MiradorWithNoSSR manifest={manifests} />
        </Box>
      )}
    </Grid>
  )
}
