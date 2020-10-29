import { Container, Heading, List } from '@chakra-ui/core'
import Activity from './Activity'

export default function ActivityStream({stream}) {
  if(!stream) {
    return null
  }

  return (
    <Container maxW="md" marginTop={10}>
      <Heading fontSize="lg">
        Historikk
      </Heading>
      <List spacing={5}>
        {stream.map(activity => (
          <Activity data={activity} />
        ))}
      </List>
    </Container>
  )
}
