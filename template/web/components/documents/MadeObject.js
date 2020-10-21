import dynamic from 'next/dynamic'
import { Box, Grid, Container, Center, Heading, Text } from '@chakra-ui/core'
import ItemImage from '../ItemImage'
import PortableTextBlock from '../PortableTextBlock'
import ReferredToBy from '../ReferredToBy'

const MiradorWithNoSSR = dynamic(
  () => import('../Mirador'),
  { ssr: false }
)

export default function MadeObject(item) {
  return (
    <Grid 
      w="100%"
      p={5}
      gridGap={5}
      alignContent= "start"
      gridTemplateAreas={{ xl: `"image image metadata"`, base: `"image" "metadata"`}}
      gridTemplateColumns={{ xl: "1fr 1fr 1fr", base: "1fr" }}
    >
      <Container gridArea="metadata">
        <Heading>
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
      {item.subjectOfManifest && (
        <Box gridArea="image">
          <MiradorWithNoSSR manifest={item.subjectOfManifest}/>
        </Box>
      )}
      

    </Grid>
  )
}
