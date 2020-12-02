import {Container, Heading, List} from '@chakra-ui/react'
import Activity from './Activity'

export default function ActivityStream({stream}) {
  if (!stream) {
    return null
  }

  return (
    <Container maxW="md" marginTop={10}>
      <Heading fontSize="lg">Historikk</Heading>
      <List spacing={5}>
        {stream.map((activity) => (
          <Activity key={activity._key} data={activity} />
        ))}
      </List>
    </Container>
  )
}
