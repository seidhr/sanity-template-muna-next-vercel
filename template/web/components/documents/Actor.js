import Link from 'next/link'
import { Box, Container, Heading } from '@chakra-ui/core'
import ItemImage from '../ItemImage'
import PortableTextBlock from '../PortableTextBlock'

export default function Actor(item) {
  console.log(item)
  return (
    <Container maxW="xl" centerContent>
      <Heading>
        {item.label}
      </Heading>
      
      {item.mainRepresentation && (
        <ItemImage 
          id={item.id} 
          label={item.label}
          url={item.mainRepresentation} />
      )}

      <Box maxW="lg">
        {item?.referredToBy?.map(ref => (
          <PortableTextBlock blocks={ref.body} />
        ))}
      </Box>
      {item.hasMember && item.hasMember.map(member => (
        <Link href={member.id}><a>{member.label}</a></Link>
      ))}
      {item.mentionedIn && item.mentionedIn.map(mention => (
        <Link href={mention.id}><a>{mention.label}</a></Link>
      ))}
    </Container>
  )
}
