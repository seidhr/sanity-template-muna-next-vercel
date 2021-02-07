import dynamic from 'next/dynamic'
import {Grid, Container, Box, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})

export default function MiradorGallery(props) {
  if (!props) {
    return null
  }

  const manifests = props.items.map((item) => item.manifest)

  return (
    <Container maxW="6xl" centerContent>
      <Grid
        w="full"
        my={5}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{xl: '"image image metadata"', base: '"image" "metadata"'}}
        gridTemplateColumns={{xl: '6fr 6fr 2fr', base: '100%'}}
      >
        <Box fontFamily="Montserrat" gridArea="metadata">
          <Heading fontSize="sm" mb={1}>
            {props.heading}
          </Heading>

          {props?.description && (
            <Box fontSize="xs" fontWeight="200">
              <PortableTextBlock blocks={props.description} />
            </Box>
          )}
        </Box>

        {manifests && (
          <Box gridArea="image">
            <MiradorWithNoSSR manifest={manifests} />
          </Box>
        )}
      </Grid>
    </Container>
  )
}
