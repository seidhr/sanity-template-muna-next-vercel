import { imageBuilder } from '../../lib/sanity'
import { Box, Heading, Text, Badge } from '@chakra-ui/core'
import styles from './Hero.module.css'
import { useColorMode, useColorModeValue } from "@chakra-ui/core"
import PortableTextBlock from '../portable-text-block'

export default function Hero(props) {
  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue("red.500", "red.200")
  const color = useColorModeValue("white", "gray.800")
  
  if (!props.illustration) {
    return null
  }
  const image = props.illustration.image

  const bgImage = `url(${imageBuilder.image(image).width('2000').url()})`

  return (
    <Box 
      display="relative"
      backgroundImage={bgImage}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="100%"
      height={{
        base: "20vh", // 0-48em
        md: "50vh", // 48em-80em,
        xl: "50vh", // 80em+
      }}
    >
      <Box
        backgroundColor={bg}
        color={color}
        position="relative"
        top= "20%"
        left="10%"
        p="10"
        display="inline-block"
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
          <Text size="xl">
            <PortableTextBlock blocks={props.tagline} />
          </Text>
        )}
      </Box>
    </Box>
  )
}
