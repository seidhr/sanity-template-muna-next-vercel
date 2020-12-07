import {Box, Container, Heading, SkeletonCircle, SkeletonText} from '@chakra-ui/react'
import InstagramEmbed from 'react-instagram-embed'

export default function InstagramPost(props) {
  const {url} = props
  if (!url) {
    return <p>Missing URL for Instagram post</p>
  }
  const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN

  return (
    <Container maxW="4xl" marginTop="10" centerContent>
      <Heading size="xl">{props.title}</Heading>
      <Box w={['sm', 'md', 'xl']}>
        <InstagramEmbed
          clientAccessToken={token}
          url={url}
          maxWidth={580}
          hideCaption={true}
          containerTagName="div"
          injectScript
        />
      </Box>
    </Container>
  )
}
