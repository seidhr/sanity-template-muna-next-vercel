import dynamic from 'next/dynamic'
import { Grid, Container, Box, Center, Heading, Text } from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), { ssr: false })

export default function MiradorGallery(props) {
  if (!props) {
    return null
  }

  const manifests = props.items.map((item) => item.manifest)

  return (
    <Container maxW="xl" centerContent>
      <Grid
        w="full"
        p={5}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{ xl: '"image image metadata"', base: '"image" "metadata"' }}
        gridTemplateColumns={{ xl: '6fr 6fr 2fr', base: '100%' }}
      >
        <Box gridArea="metadata">
          <Heading fontSize="sm" mb={1} color="gray.600">
            {props.heading}
          </Heading>

          {props?.description && (
            <Box fontSize="xs" fontFamily="Montserrat" fontWeight="200">
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
