import {imageBuilder} from '../../lib/sanity'
import {Grid, Box, Heading, Image, Badge} from '@chakra-ui/react'
import {useColorMode, useColorModeValue} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function Hero(props) {
  const {colorMode, toggleColorMode} = useColorMode()

  const bg = useColorModeValue('green.800', 'green.300')
  const color = useColorModeValue('white', 'gray.800')
  const height = '60vh'

  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  return (
    <Grid 
      gridTemplateAreas={{md: '"hero"', base: '"hero" "text"'}}
      w="full" 
      marginBottom="10"
      maxH={height}
    >
      <Box
        gridArea={{md: 'hero', base: 'text'}}
        d="flex"
        color={color}
        p={["0", "5"]}
        zIndex="1"
        selfalign="center"
        justifyContent="center"
        alignItems="flex-end"
        placeItems="center"
      >
        <Box
          w={{base: "full", md: "6xl"}}
          px={["3", "8"]}
          pt={["2", "4"]}
          backgroundColor={bg}
        >
          <Badge 
            backgroundColor={bg} 
            color={color}
          >
            {props.label}
          </Badge>

          <Heading 
            fontSize={["md", "6xl"]} 
          >
            {props.title}
          </Heading>

          {props?.tagline && (
            <Box>
              <PortableTextBlock fontSize={["md", "xl"]} blocks={props.tagline} />
            </Box>
          )}
        </Box>
      </Box>
      
      <Image
        gridArea="hero"
        objectFit="cover"
        objectPosition="0% 100%"
        /* h="100%" */
        maxH={height}
        width="100%"
        justifyContent="flex-end"
        overflow="hidden"
        src={imageBuilder.image(image).url()}
        alt={''}
      />
    </Grid>
  )
}
