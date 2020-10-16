import { Box, Container, Heading, Text } from '@chakra-ui/core'
import PortableTextBlock from './PortableTextBlock'
import {orderBy, head} from 'lodash'

export default function ReferredToBy(array) {
  if(!array) {
    return null
  }
  
  array.array.map(obj => obj.lang = obj.language.identifiedByISO6393)
  const sorted = orderBy(array.array, ['lang'], ['desc'])
  return (
      <Box maxW="xl">
        {sorted?.map(ref => (
          <PortableTextBlock blocks={ref.body} />
        ))}
      </Box>
  )
}
