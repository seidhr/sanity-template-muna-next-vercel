import { imageBuilder } from '../../lib/sanity'
import { Center, Container, Grid, Box, Heading, Image } from '@chakra-ui/core'
import { useColorMode, useColorModeValue } from "@chakra-ui/core"
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  const color = useColorModeValue("black", "white")
  const bg = useColorModeValue("gray.900", "gray.900")
  const opacity = useColorModeValue("0.7", "0.4")

  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  return (
    <Grid 
      gridTemplateAreas='"hero"'
      w="100%"
      height="300px"
      alignItems="center"
    >
      <Box
        gridArea="hero"
        color={color}
        height="100%"
        zIndex="1"
        >
        <Container marginTop="10">
          <Heading size="2xl">
            {props.title}
          </Heading>

          {props?.subtitle && (
            <Box size="xl">
              <PortableTextBlock blocks={props.subtitle} />
            </Box>
          )}
        </Container>
      </Box>
      <Image 
        gridArea="hero"
        objectFit="cover"
        height="100vh"
        maxHeight="300px"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        opacity={opacity}
        src={imageBuilder.image(image).width('1000').height('300').url()} alt={"No label"} 
      />
    </Grid>
  )
}
