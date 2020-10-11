import { imageBuilder } from '../../lib/sanity'
import { Box, Heading, Text } from '@chakra-ui/core'
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
        <Heading
          size="2xl"
        >
          {props.title}
        </Heading>
        {props?.subtitle && (
          <Text size="xl">
            <PortableTextBlock blocks={props.subtitle} />
          </Text>
        )}
      </Box>
    </Box>
  )
}
