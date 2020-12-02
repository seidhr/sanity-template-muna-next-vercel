import {Box, Grid, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from './PortableTextBlock'
import {orderBy, head} from 'lodash'

export default function ReferredToBy(array) {
  if (!array) {
    return null
  }

  array.array.map((obj) => (obj.lang = obj.language.identifiedByISO6393))
  const sorted = orderBy(array.array, ['lang'], ['desc'])
  return (
    <>
      {sorted?.map((ref) => (
        <Box key={ref._key ? ref._key : ref._id} maxW="xl" marginBottom={5}>
          <Box>
            {ref.hasType[0].label.nor} - {ref.language.label.nor}
          </Box>
          <PortableTextBlock blocks={ref.body} />
        </Box>
      ))}
    </>
  )
}
