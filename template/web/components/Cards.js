import {Heading, Flex, WrapItem, Grid} from '@chakra-ui/react'
import Card from './Card'

export default function Cards({items}) {
  if (!items) {
    return null
  }

  return (
    <Grid gap={2} autoFlow="row dense" templateColumns={{sm:"repeat(1, 1fr)", md:"repeat(2, 1fr)", lg:"repeat(3, 1fr)"}}>
      {items.map((item, index) => (
        <Card w="160px" key={index} item={item} />  
      ))}
    </Grid>
  )
}
