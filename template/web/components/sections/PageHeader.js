import { imageBuilder } from '../../lib/sanity'
import { Grid, Container, Box, Heading, Image } from '@chakra-ui/core'
import styles from './PageHeader.module.css'
import { useColorMode, useColorModeValue } from "@chakra-ui/core"
import PortableTextBlock from '../portable-text-block'

export default function PageHeader(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue("red.500", "red.100")
  const color = useColorModeValue("white", "gray.800")

  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  return (
    <Container 
      maxW="4xl" 
      marginTop="10"
    >
      <Image 
        gridArea="pageheader"
        objectFit="cover"
        height="25vh"
        maxHeight="400px"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        src={imageBuilder.image(image).width('1000').height('400').url()} alt={"No label"} 
      />

      <Box
        backgroundColor={bg}
        color={color}
        p="10"
      >
        <Heading
          size="xl"
        >
          {props.title}
        </Heading>
        {props?.subtitle && (
          <Box size="xl">
            <PortableTextBlock blocks={props.tagsubtitleline} />
          </Box>
        )}
      </Box>
    </Container>
  )
}
