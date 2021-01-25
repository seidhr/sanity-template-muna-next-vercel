import {imageBuilder} from '../../lib/sanity'
import {Grid, Box, Heading, Image, Badge} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function Hero(props) {
  const {colorMode, toggleColorMode} = useColorMode()

  const bg = useColorModeValue('gray.800', 'white')
  const color = useColorModeValue('white', 'gray.800')

  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  return (
    <Grid gridTemplateAreas='"hero"' w="full" maxHeight="600px" marginBottom="10">
      <Box
        d="flex"
        gridArea="hero"
        color={color}
        p="5"
        zIndex="1"
        selfalign="center"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Box
          w="md"
          px="10"
          pt="4"
          backgroundColor={bg}
          opacity="80%"
        >
          <Badge 
            opacity="100%"
            backgroundColor={bg} 
            color={color}>
              {props.label}
          </Badge>
          <Heading size="xl" opacity="100%">{props.title}</Heading>
          {props?.tagline && (
            <Box size="xl" opacity="100%" >
              <PortableTextBlock blocks={props.tagline} />
            </Box>
          )}
        </Box>
      </Box>
      <Image
        gridArea="hero"
        objectFit="cover"
        maxHeight="600px"
        width="100%"
        justifyContent="end"
        overflow="hidden"
        src={imageBuilder.image(image).url()}
        alt={''}
      />
    </Grid>
  )
}
