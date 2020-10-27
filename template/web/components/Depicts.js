import { imageBuilder } from '../lib/sanity'
import { Avatar, Container, Heading, Link, Wrap } from '@chakra-ui/core'

export default function Depicts({ depicted }) {
  if(!depicted) {
    return null
  }

  return (
    <Container w="lg">
      <Heading>Avbildet</Heading>
      <Wrap>
        {depicted.map(actor => (
          <Link
            key={actor.id}
            href={`/id/${actor.id}`}
          >
            <Avatar  
              size="xl" 
              name={actor.label} 
              src={imageBuilder.image(actor.mainRepresentation).height('300').width('300').url()} 
            />
          </Link>
        ))}
      </Wrap>
    </Container>
  )
}
