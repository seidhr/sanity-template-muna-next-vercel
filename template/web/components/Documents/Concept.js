import {Box, Container, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import Cards from '../Cards'

export default function Concept(item) {
  return (
    <Container maxW="full" centerContent>
      <Heading fontSize={{sm:"2xl", md:"4xl"}}>{item.label.nor}</Heading>
      
      <Box maxW="2xl">
        {item?.referredToBy?.map((ref) => (
          <PortableTextBlock blocks={ref.body} />
        ))}
      </Box>
      
      {item.mentionedIn && <Cards items={item.mentionedIn} />}
    </Container>
  )
}
