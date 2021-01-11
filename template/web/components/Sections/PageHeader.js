import {imageBuilder} from '../../lib/sanity'
import {Center, Container, Grid, Box, Heading, Image} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  const {colorMode, toggleColorMode} = useColorMode()

  const color = useColorModeValue('black', 'white')
  const bg = useColorModeValue('gray.100', 'gray.900')
  const opacity = useColorModeValue('0.7', '0.4')

  if (!props) {
    return null
  }
  const image = props.illustration?.image

  return (
    <Grid gridTemplateAreas='"hero"' w="100%" height="200px" alignItems="center" backgroundColor={bg}>
      <Box gridArea="hero" color={color} height="100%" zIndex="1">
        <Container marginTop="10">
          <Heading size="2xl">{props.title}</Heading>

          {props?.subtitle && (
            <Box size="xl">
              <PortableTextBlock blocks={props.subtitle} />
            </Box>
          )}
        </Container>
      </Box>
      {image && (<Image
        gridArea="hero"
        objectFit="cover"
        height="100vh"
        maxHeight="200px"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        opacity={opacity}
        src={imageBuilder.image(image).width('1000').height('300').url()}
        alt={'No label'}
      />)}
    </Grid>
  )
}
