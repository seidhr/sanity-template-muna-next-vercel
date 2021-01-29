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
    <Grid 
      /* gridTemplateAreas='"hero"'  */
      gridTemplateAreas={{md: '"hero"', base: '"hero" "text"'}}
      w="full" 
      /* maxHeight="600px"  */
      marginBottom="10"
    >
      <Box
        gridArea={{md: 'hero', base: 'text'}}
        d="flex"
        
        color={color}
        p={["0", "5"]}
        zIndex="1"
        selfalign="center"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Box
          w={{base: "full", md: "md"}}
          px={["3", "8"]}
          pt={["2", "4"]}
          backgroundColor={bg}
          opacity="80%"
        >
          <Badge 
            opacity="100%"
            backgroundColor={bg} 
            color={color}
          >
            {props.label}
          </Badge>
          <Heading fontSize={["md", "2xl"]} opacity="100%">{props.title}</Heading>
          {props?.tagline && (
            <Box opacity="100%" >
              <PortableTextBlock fontSize={["md", "xl"]} blocks={props.tagline} />
            </Box>
          )}
        </Box>
      </Box>
      
      <Image
        gridArea="hero"
        objectFit="cover"
        maxHeight="600px"
        width="100%"
        justifyContent="flex-end"
        overflow="hidden"
        src={imageBuilder.image(image).url()}
        alt={''}
      />
    </Grid>
  )
}
