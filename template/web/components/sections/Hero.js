import { imageBuilder } from '../../lib/sanity'
import { Grid, Box, Heading, Image, Badge } from '@chakra-ui/core'
import styles from './Hero.module.css'
import { useColorMode, useColorModeValue } from "@chakra-ui/core"
import PortableTextBlock from '../portable-text-block'

export default function Hero(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue("gray.800", "white")
  const color = useColorModeValue("white", "gray.800")
  
  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

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
        <Badge>
          {props.label}
        </Badge>
        <Heading
          size="2xl"
        >
          {props.heading}
        </Heading>
        {props?.tagline && (
          <Box size="xl">
            <PortableTextBlock blocks={props.tagline} />
          </Box>
        )}
      </Box>
      <Image 
        gridArea="hero"
        objectFit="cover"
        height="65vh"
        maxHeight="600px"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        src={imageBuilder.image(image).url()} alt={"No label"} 
      />
    </Grid>
  )
}
