import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  return (
    <Container maxW="3xl">
      <Box maxW="xl">
        <Center>
          <Heading fontSize="xl">{props.title}</Heading>
        </Center>
        <Center>
          {props?.subtitle && (
            <Box>
              <PortableTextBlock blocks={props.subtitle} />
            </Box>
          )}
        </Center>
        <PortableTextBlock blocks={props.content} />
      </Box>
    </Container>
  )
}
