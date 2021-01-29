import {AspectRatio, Container, Heading} from '@chakra-ui/react'

export default function Iframe(props) {
  const getId = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1)

  if(props.disabled === true) {
    return null
  }

  return (
    <Container maxW="4xl" marginTop="10"  centerContent>
      <Heading size="xl">{props.title}</Heading>
      <Container maxW="4xl" p="3" backgroundColor="white" position="relative">
        <AspectRatio ratio={4/3}>
          <iframe
            src={props.url}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          />
        </AspectRatio>
      </Container>
    </Container>
  )
}
