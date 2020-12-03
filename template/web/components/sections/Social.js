import {Box, Container, Heading, SkeletonCircle, SkeletonText} from '@chakra-ui/react'
import {TwitterTweetEmbed} from 'react-twitter-embed'

export default function Social(props) {
  return (
    <Container maxW="4xl" marginTop="10" centerContent>
      <Heading size="xl">{props.title}</Heading>
      <TwitterTweetEmbed
        tweetId={props.url}
        placeholder={
          <Box w="2xl" padding="6" border="1px" borderColor="gray.200" borderRadius="md" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        }
      />
    </Container>
  )
}
