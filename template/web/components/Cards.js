import {Heading, SimpleGrid} from '@chakra-ui/react'
import Card from './Card'

export default function Cards({items}) {
  if (!items) {
    return null
  }

  return (
    <SimpleGrid columns={[1, 2, 4, 5]} spacing={5} padding={5}>
      {items.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </SimpleGrid>
  )
}
