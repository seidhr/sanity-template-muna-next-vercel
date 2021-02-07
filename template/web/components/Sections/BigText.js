import {Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  return (
    <Container maxW="3xl" marginTop="10">
      <Box color="gray.500" maxW="xl">
        <PortableTextBlock
          fontSize="2xl"
          fontWeight="500"
          blocks={props.content}
          
        />
      </Box>
    </Container>
  )
}
