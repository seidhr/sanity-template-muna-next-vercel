import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  return (
    <Container maxW="3xl" marginTop="10">
      <Box>
        <Center>
          <Heading size="xl">{props.title}</Heading>
        </Center>
        <Center>
          {props?.subtitle && (
            <Box size="xl">
              <PortableTextBlock blocks={props.subtitle} />
            </Box>
          )}
        </Center>
        <Box size="md">
          <PortableTextBlock blocks={props.content} />
        </Box>
      </Box>
    </Container>
  )
}
