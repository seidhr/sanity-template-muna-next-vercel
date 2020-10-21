import dynamic from 'next/dynamic'
import { Box, Grid, Container, Center, Heading } from '@chakra-ui/core'
import ItemImage from '../ItemImage'
import ReferredToBy from '../ReferredToBy'

const MiradorWithNoSSR = dynamic(
  () => import('../Mirador'),
  { ssr: false }
)

export default function MadeObject(item) {
  return (
    <>
    <Grid 
      w="100%"
      p={5}
      gridGap={5}
      alignContent= "start"
      gridTemplateAreas={{ xl: `"image image metadata"`, base: `"image" "metadata"`}}
      gridTemplateColumns={{ xl: "1fr 1fr 1fr", base: "1fr" }}
    >
      <Container maxW="md" gridArea="metadata">
        <Heading mb={10}>
          {item.label}
        </Heading>

        {item?.referredToBy && (
          <Box>
            <ReferredToBy array={item.referredToBy} />
          </Box>
        )}
      </Container>

      {item.mainRepresentation && !item.subjectOfManifest && (
        <Center 
          gridArea="image"
          borderRight={{xl: "1px"}} 
          borderColor={{xl: "gray.200"}}
        >
          <ItemImage 
            id={item.id} 
            label={item.label}
            url={item.mainRepresentation} 
          />
        </Center>
      )}
      {item.mainRepresentation.iiifImage && (
        <Box gridArea="image">
          <MiradorWithNoSSR image={item.mainRepresentation.iiifImage.url}/>
        </Box>
      )}
      {item.subjectOfManifest && (
        <Box gridArea="image">
          <MiradorWithNoSSR manifest={item.subjectOfManifest} />
        </Box>
      )}
    </Grid>
    <Container maxW="lg">
      <pre>
        {JSON.stringify(item, null, 2)}
      </pre>
    </Container>
    </>
  )
}
