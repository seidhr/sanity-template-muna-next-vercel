import { Box, Grid, Heading, Text } from '@chakra-ui/core'
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
          <Grid templateColumns="100px 1fr">
            <Box>{ref.hasType[0].label.nor}<br/>{ref.language.label.nor}</Box>
            <PortableTextBlock blocks={ref.body} />
          </Grid>
        ))}
      </Box>
  )
}
