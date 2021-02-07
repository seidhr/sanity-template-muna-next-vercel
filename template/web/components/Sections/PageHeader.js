import {imageBuilder} from '../../lib/sanity'
import {Center, Container, Grid, Box, Heading, Image} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  const {colorMode, toggleColorMode} = useColorMode()

  const color = useColorModeValue('black', 'white')
  const bg = useColorModeValue('gray.100', 'gray.900')
  const opacity = useColorModeValue('0.7', '0.4')
  const height = '50vh'

  if (!props) {
    return null
  }
  const image = props.illustration?.image

  return (
    <Grid gridTemplateAreas='"hero"' w="100%" h={height} backgroundColor={bg}>
      <Container gridArea="hero" color={color} maxW="3xl" alignSelf="center" zIndex="1">
        <Heading 
          fontSize="6xl" 
          w="100%" 
          textTransform="uppercase" 
          color="teal.400"
          textShadow="1px 1px white"
        >
          {props.title}
        </Heading>

        {props?.subtitle && (
          <Box size="xl">
            <PortableTextBlock blocks={props.subtitle} />
          </Box>
        )}
      </Container>

      {image && (<Image
        gridArea="hero"
        objectFit="cover"
        height="100%"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        src={imageBuilder.image(image).width('1000').height('300').url()}
        alt={''}
      />)}
    </Grid>
  )
}
