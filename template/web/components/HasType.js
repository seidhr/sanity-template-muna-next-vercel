import { Stack, Badge } from '@chakra-ui/core'

export default function HasType({types}) {
  if(!types) {
    return null
  }

  return (
    <Stack fontFamily="Montserrat" direction="row" marginBottom={5}>
      {types.map(type => (
        <Badge fontSize="lg">{type.label.nor}</Badge>
      ))}
    </Stack>
  )
}
