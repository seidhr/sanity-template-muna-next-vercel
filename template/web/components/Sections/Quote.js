import {Grid, Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlockQuote from '../PortableTextBlockQuote'
import PortableTextBlock from '../PortableTextBlock'

export default function Quote(props) {
  return (
    <Container maxW="3xl" marginTop="10">
      <Box maxW="xl">
        <PortableTextBlockQuote fontSize="2xl" blocks={props.content} />
        
        {props.credit && (
          <PortableTextBlock blocks={props.credit} />
        )}
      </Box>
    </Container>
  )
}
