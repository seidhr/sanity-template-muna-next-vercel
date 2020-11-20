import {Box, Container, Heading} from '@chakra-ui/core'
import PortableTextBlock from '../PortableTextBlock'
import Cards from '../Cards'

export default function Concept(item) {
  return (
    <Container maxW="xl" centerContent>
      <Heading p={5}>{item.label.nor}</Heading>

      <Box maxW="lg">
        {item?.referredToBy?.map((ref) => (
          <PortableTextBlock blocks={ref.body} />
        ))}
      </Box>

      {item.mentionedIn && <Cards items={item.mentionedIn} />}
    </Container>
  )
}
