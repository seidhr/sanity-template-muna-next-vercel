import { Stack, Badge } from '@chakra-ui/core'

export default function Subject({subjects}) {
  if(!subjects) {
    return null
  }

  return (
    <Stack fontFamily="Montserrat" direction="row" marginBottom={5}>
      {subjects.map(subject => (
        <Badge colorScheme="green" fontSize="lg">{subject.label.nor}</Badge>
      ))}
    </Stack>
  )
}
