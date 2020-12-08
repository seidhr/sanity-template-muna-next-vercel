import dynamic from 'next/dynamic'
import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})

export default function SingleObject(props) {
  if (!props) {
    return null
  }

  return (
    <Container maxW="xl" centerContent>
      <Grid
        w="full"
        p={5}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{xl: '"image image metadata"', base: '"image" "metadata"'}}
        gridTemplateColumns={{xl: '6fr 6fr 2fr', base: '100%'}}
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

        {props?.item.manifest && (
          <Box gridArea="image">
            <MiradorWithNoSSR manifest={[props.item.manifest]} />
          </Box>
        )}
      </Grid>
    </Container>
  )
}
