import { Heading, SimpleGrid } from '@chakra-ui/core'
import Card from './Card'

export default function Cards({items}) {
  if(!items) {
    return null
  }

  return (
    <>
      <Heading>
        Forbundet med disse objektene
      </Heading>
      <SimpleGrid
        columns={[1,2,4,5]} 
        spacing={5}
        padding={5}
      >
        {items.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </SimpleGrid>
    </>
  )
}
