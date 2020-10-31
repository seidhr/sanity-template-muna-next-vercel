import { Stack, Badge } from '@chakra-ui/core'
import Link from './Link'

export default function Subject({subjects}) {
  if(!subjects) {
    return null
  }

  return (
    <Stack fontFamily="Montserrat" direction="row" marginBottom={5}>
      {subjects.map(subject => (
        <Badge key={subject._id} colorScheme="green" fontSize="lg">
          <Link href={`/id/${subject._id}`}>{subject.label.nor}</Link>
        </Badge>
      ))}
    </Stack>
  )
}
