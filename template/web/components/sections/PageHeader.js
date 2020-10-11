import { imageBuilder } from '../../lib/sanity'
import { Grid, Box, Heading, Image } from '@chakra-ui/core'
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

  const bgImage = `url(${imageBuilder.image(image).width('2000').url()})`

  return (
    <Grid 
      gridTemplateAreas="hero"
      height="65vh"
      maxHeight="600px"
    >
      <Box
        gridArea="hero"
        backgroundColor={bg}
        color={color}
        p="10"
        height="65vh"
        maxHeight="30%"
        zIndex="1"
        marginLeft="5%"
        marginTop="5%"
        maxWidth="35%"
        minWidth="30ch"
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
      </Box>
      <Image 
        gridArea="hero"
        objectFit="cover"
        height="100%"
        width="100%"
        justifyContent="end"
        src={imageBuilder.image(image).url()} alt={"No label"} 
      />
    </Grid>
  )
}
