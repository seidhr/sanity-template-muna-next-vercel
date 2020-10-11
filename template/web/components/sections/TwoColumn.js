import { Grid, Box, Center, Heading, Text } from '@chakra-ui/core'
import styles from './PageHeader.module.css'
import PortableTextBlock from '../portable-text-block'

export default function TwoColumn(props) {
  return (
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
          <Text size="xl">
            <PortableTextBlock blocks={props.subtitle} />
          </Text>
        )}
      </Center>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} p="10">
        <Box>
          {props?.firstColumn && (
            <Text size="xl">
              <PortableTextBlock blocks={props.firstColumn} />
            </Text>
          )}
        </Box>
        <Box>
        {props?.secondColumn && (
            <Text size="xl">
              <PortableTextBlock blocks={props.secondColumn} />
            </Text>
          )}
        </Box>
      </Grid>
    </Box>
  )
}
