import Link from 'next/link'
import { Box, Container, Flex, Heading } from '@chakra-ui/core'
import ItemImage from '../ItemImage'
import PortableTextBlock from '../PortableTextBlock'
import Cards from '../Cards'

export default function Actor(item) {

  return (
    <Container maxW="xl" centerContent>
      <Flex mb={10}>
        <Box w="200px">
          {item.mainRepresentation && (
            <ItemImage
              id={item.id} 
              label={item.label}
              url={item.mainRepresentation} />
            )}
          </Box>
        <Heading p={5} flex="1">
          {item.label}
        </Heading>
      </Flex>

      <Box maxW="lg">
        {item?.referredToBy?.map(ref => (
          <PortableTextBlock blocks={ref.body} />
        ))}
      </Box>
      {item.hasMember && item.hasMember.map(member => (
        <Link href={member.id}><a>{member.label}</a></Link>
      ))}
      {item.mentionedIn && (
        <Cards items={item.mentionedIn} />
      )}
    </Container>
  )
}
