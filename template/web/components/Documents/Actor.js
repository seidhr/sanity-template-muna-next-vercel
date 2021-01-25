import Link from 'next/link'
import {Avatar, Badge, Box, Container, Flex, Heading} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'
import Cards from '../Cards'
import {imageBuilder} from '../../lib/sanity'

export default function Actor(item) {
  return (
    <Container maxW="xl" centerContent>
      <Flex key={item.id}>
        <Avatar
          size="xl"
          name={item.label}
          src={imageBuilder.image(item.mainRepresentation).height('200').width('200').url()}
        />
        <Box p={5}>
          <Heading size={["2xl", "4xl"]}>
            <Link href={`/id/${item.id}`}>
              <a>{item.label}</a>
            </Link>
          </Heading>
          <Box d="flex" alignItems="baseline">
            {item.hasType &&
              item.hasType.map((type) => (
                <Badge key={type._id} borderRadius="full" px="2" colorScheme="teal">
                  {type.label?.nor}
                </Badge>
              ))}
            {!item.hasType && (
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Person
              </Badge>
            )}
          </Box>
        </Box>
      </Flex>

      <Box maxW="lg">
        {item?.referredToBy?.map((ref) => (
          <PortableTextBlock key={ref._key} blocks={ref.body} />
        ))}
      </Box>
      {item.hasMember &&
        item.hasMember.map((member) => (
          <Link href={member.id}>
            <a>{member.label}</a>
          </Link>
        ))}
      {item.mentionedIn && <Cards items={item.mentionedIn} />}
    </Container>
  )
}
