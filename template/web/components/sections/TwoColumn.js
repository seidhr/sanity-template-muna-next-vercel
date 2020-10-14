import { Grid, Container, Box, Center, Heading, Text } from '@chakra-ui/core'
import styles from './PageHeader.module.css'
import PortableTextBlock from '../PortableTextBlock'

export default function TwoColumn(props) {
  return (
    <Container 
      maxW="4xl" 
      marginTop="10"
    >
      <Box>
        <Center>
          <Heading
            size="2xl"
          >
            {props.title}
          </Heading>
        </Center>
        <Center>
          {props?.subtitle && (
            <Box size="xl">
              <PortableTextBlock blocks={props.subtitle} />
            </Box>
          )}
        </Center>
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} p="10">
          <Box>
            {props?.firstColumn && (
              <Box size="xl">
                <PortableTextBlock blocks={props.firstColumn} />
              </Box>
            )}
          </Box>
          <Box>
          {props?.secondColumn && (
            <Box size="xl">
              <PortableTextBlock blocks={props.secondColumn} />
            </Box>
          )}
          </Box>
        </Grid>
      </Box>
    </Container>
  )
}
