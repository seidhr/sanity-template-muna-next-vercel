import {Container, Wrap, WrapItem, Badge} from '@chakra-ui/react'
import Link from './Link'

export default function Subject({subjects}) {
  if (!subjects) {
    return null
  }

  return (
    <Wrap fontFamily="Montserrat" marginBottom={5}>
      {subjects.map((subject) => (
        <WrapItem>
          <Badge key={subject._id} colorScheme="green" fontSize="lg">
            <Link href={`/id/${subject._id}`}>{subject.label.nor}</Link>
          </Badge>
        </WrapItem>
      ))}
    </Wrap>
  )
}
