import {Container, Box, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function SectionText(props) {
  return (
    <Container maxW="3xl" marginTop="10">
      <Box size="xl">
        <PortableTextBlock
          className="big-text"
          fontSize="3xl"
          fontWeight="600"
          blocks={props.content}
        />
      </Box>
    </Container>
  )
}
