import Link from 'next/link'
import {GridItem, Box, Badge} from '@chakra-ui/react'
import CardImage from './CardImage'

export default function Card({item}) {
  return (
    <GridItem alignSelf="center" maxW="md" m="4" borderWidth="1px" borderRadius="md">
      {item.mainRepresentation && (
        <CardImage id={item.id} label={item.label} url={item.mainRepresentation} />
      )}

      <Box fontFamily="Montserrat" p="5">
        <Box mt="1" fontWeight="semibold" as="h4" s={['sm', 'xl']} lineHeight="tight" >
          <Link href={`/id/${encodeURIComponent(item.id)}`}>
            <a>{item.label}</a>
          </Link>
        </Box>

        <Box d="flex" alignItems="baseline">
          {item.hasType &&
            item.hasType.map((type) => (
              <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
                {type.label?.nor}
              </Badge>
            ))}
        </Box>
      </Box>
    </GridItem>
  )
}
