import {Stack, Badge} from '@chakra-ui/react'

export default function HasType({types}) {
  if (!types) {
    return null
  }

  return (
    <Stack fontFamily="Montserrat" direction="row" marginBottom={5}>
      {types.map((type) => (
        <Badge key={type._id} fontSize="md">
          {type.label.nor}
        </Badge>
      ))}
    </Stack>
  )
}
