import {Heading, Wrap, WrapItem} from '@chakra-ui/react'
import Card from './Card'

export default function Cards({items}) {
  if (!items) {
    return null
  }

  return (
    <Wrap spacing="30px" justify="center">
      {items.map((item, index) => (
        <WrapItem>
          <Card key={index} item={item} />  
        </WrapItem>
      ))}
    </Wrap>
  )
}
