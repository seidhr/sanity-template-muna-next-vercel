import {AspectRatio, Box, Center, Container, Heading} from '@chakra-ui/react'
import ReactPlayer from 'react-player/lazy'

export default function Video(props) {
  return (
    <Container maxW="4xl" marginTop="10" centerContent>
      <Heading size="xl">{props.title}</Heading>
      <Center>
        <Box w="3xl">
          {/* <ReactPlayer
            url={props.url}
            controls="true"
            width="1000px"
          /> */}
          <AspectRatio ratio={16/9}>
            <iframe
              width="100%"
              title="naruto"
              src={props.url}
              allowFullScreen
            />
          </AspectRatio>
        </Box>
      </Center>
    </Container>
  )
}
