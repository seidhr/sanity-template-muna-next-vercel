import {Box, Container, Heading, SkeletonCircle, SkeletonText} from '@chakra-ui/react'

export default function Iframe(props) {
  const getId = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1)

  return (
    <Container maxW="6xl" marginTop="10"  centerContent>
      <Heading size="xl">{props.title}</Heading>
      <Box w={['sm', 'md', '6xl']} px="4">
        <iframe
          src={props.url}
          width="100%"
          height="450"
          frameBorder="0"
          style={{border: '0'}}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </Box>
    </Container>
  )
}
