import React from 'react'
import dynamic from 'next/dynamic'
import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

const MiradorWithNoSSR = dynamic(() => import('../Mirador'), {ssr: false})
const CanvasPanelFullScreedWithNoSSR = dynamic(() => import('../CanvasPanelFullScreen'), {ssr: false})

export default function SingleObject(props) {
  if (!props) {
    return null
  }
  const ref = React.createRef();

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
          <Heading fontFamily="Montserrat" fontSize="sm" mb={1}>
            {props.title}
          </Heading>

          {props?.description && (
            <Box fontSize="xs" fontWeight="200">
              <PortableTextBlock blocks={props.description} />
            </Box>
          )}
        </Box>

        {props?.item.manifest && (
          <Box gridArea="image">
            {/* <MiradorWithNoSSR manifest={[props.item.manifest]} /> */}
            <CanvasPanelFullScreedWithNoSSR ref={ref} manifest={[props.item.manifest]} />
          </Box>
        )}
      </Grid>
    </Container>
  )
}
