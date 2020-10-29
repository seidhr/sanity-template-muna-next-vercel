import { imageBuilder } from '../lib/sanity'
import { Avatar, Container, Flex, Heading, Link, Wrap } from '@chakra-ui/core'

export default function Depicts({ depicted }) {
  if(!depicted) {
    return null
  }

  return (
    <Container maxW="md">
      <Heading fontSize="md">Avbildet</Heading>
      <Flex gridGap={5}>
        {depicted.map(actor => (
          <Link
            key={actor.id}
            href={`/id/${actor.id}`}
          >
            <Avatar  
              size="2xl" 
              name={actor.label} 
              src={imageBuilder.image(actor.mainRepresentation).height('300').width('300').url()} 
            />
          </Link>
        ))}
      </Flex>
    </Container>
  )
}
