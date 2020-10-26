import { imageBuilder } from '../../lib/sanity'
import { Center, Container, Box, Heading, Image } from '@chakra-ui/core'
import { useColorMode, useColorModeValue } from "@chakra-ui/core"
import PortableTextBlock from '../PortableTextBlock'

export default function PageHeader(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  const color = useColorModeValue("black", "gray.200")

  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  return (
    <Container 
      maxW="4xl" 
      marginTop="5"
    >
      <Center
        color={color}
        p="10"
      >
        <Heading
          size="2xl"
        >
          {props.title}
        </Heading>
        {props?.subtitle && (
          <Box size="xl">
            <PortableTextBlock blocks={props.tagsubtitleline} />
          </Box>
        )}
      </Center>

      <Image 
        gridArea="pageheader"
        objectFit="cover"
        maxHeight="400px"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        src={imageBuilder.image(image).width('1000').height('400').url()} alt={"No label"} 
      />

    </Container>
  )
}
