import {Box, Grid, Heading} from '@chakra-ui/core'
import PortableTextBlock from './PortableTextBlock'

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export default function Timespan({timespan}) {
  if (!timespan) {
    return null
  }

  return (
    <Box fontFamily="Montserrat">
      {timespan.map((time) => (
        <Box key={time._key}>
          {time.date && formatDate(time.date)}

          {time.beginOfTheBegin && formatDate(time.beginOfTheBegin)}

          {time.endOfTheBegin && formatDate(time.endOfTheBegin)}

          {time.beginOfTheBegin && time.endOfTheEnd && <span>&nbsp;-</span>}

          {time.beginOfTheEnd && formatDate(time.beginOfTheEnd)}

          {time.endOfTheEnd && formatDate(time.endOfTheEnd)}

          {time.description?.nor && <PortableTextBlock blocks={time.description.nor} />}
        </Box>
      ))}
    </Box>
  )
}
