import { imageBuilder } from '../../lib/sanity'
import { Grid, Box, Heading, Image, Badge } from '@chakra-ui/react'
import styles from './Hero.module.css'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function Hero(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue('gray.800', 'white')
  const color = useColorModeValue('white', 'gray.800')

  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  return (
    <Grid gridTemplateAreas='"hero"' w="full" height="100vh" maxHeight="600px" marginBottom="10">
      <Box
        d="inline-block"
        gridArea="hero"
        backgroundColor={bg}
        color={color}
        p="10"
        zIndex="1"
        selfalign="center"
        marginTop="5%"
        marginRight="50%"
        marginBottom="50%"
        marginLeft="5%"
      >
        <Badge>{props.label}</Badge>
        <Heading size="2xl">{props.heading}</Heading>
        {props?.tagline && (
          <Box size="xl">
            <PortableTextBlock blocks={props.tagline} />
          </Box>
        )}
      </Box>
      <Image
        gridArea="hero"
        objectFit="cover"
        height="100vh"
        maxHeight="600px"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        src={imageBuilder.image(image).url()}
        alt={'No label'}
      />
    </Grid>
  )
}
