import { imageBuilder } from '../../lib/sanity'
import { Grid, Box, Heading, Image, Badge } from '@chakra-ui/core'
import styles from './Hero.module.css'
import { useColorMode, useColorModeValue } from "@chakra-ui/core"
import PortableTextBlock from '../portable-text-block'
import ItemImage from '../ItemImage'

export default function Hero(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue("red.500", "red.200")
  const color = useColorModeValue("white", "gray.800")
  
  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  return (
    <Grid 
      gridTemplateAreas="hero"
    >
      <Box
        gridArea="hero"
        /* backgroundColor={bg} */
        color={color}
        p="10"
        height="65vh"
        maxHeight="600px"
        zIndex="1"
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
        height="100%"
        width="100%"
        justifyContent="end"
        src={imageBuilder.image(image).url()} alt={"No label"} 
      />
    </Grid>
  )
}
