import Link from 'next/link'
import { Box, Badge } from '@chakra-ui/core'
import CardImage from './CardImage'

export default function Card({item}) {

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="md" overflow="hidden">
      {item.mainRepresentation && (
        <CardImage id={item.id} label={item.label} url={item.mainRepresentation} />
      )}

      <Box fontFamily="Montserrat" p="5">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Link href={`/id/${encodeURIComponent(item.id)}`}>
            <a>{item.label}</a>
          </Link>
        </Box>

        <Box d="flex" alignItems="baseline">
          {item.hasType && item.hasType.map(type => (
            <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
              {type.label?.nor}
            </Badge>)
          )}
        </Box>
      </Box>
    </Box>
  )
}
