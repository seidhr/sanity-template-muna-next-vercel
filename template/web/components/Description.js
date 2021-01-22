import {Box, Text} from '@chakra-ui/react'

export default function Description(props) {
  if (!props) {
    return null
  }

  return (
    <Box maxW="xl" marginBottom={5}>
      <Text dangerouslySetInnerHTML={{__html: props.description}} />
    </Box>
  )
}
