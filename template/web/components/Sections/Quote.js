import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlockQuote from '../PortableTextBlockQuote'
import PortableTextBlock from '../PortableTextBlock'

export default function Quote(props) {
  return (
    <Container maxW="4xl" marginTop="10">
      <Box>
        <Box size="md">
          <PortableTextBlockQuote fontSize="2xl" blocks={props.content} />
        </Box>
      </Box>
      {props?.credit && (
        <Box size="xl">
          <PortableTextBlock blocks={props.credit} />
        </Box>
      )}
    </Container>
  )
}
