import {Grid, Box, Container, Heading, Text, useColorMode, useColorModeValue} from '@chakra-ui/react'

export default function Footer() {
  const {colorMode, toggleColorMode} = useColorMode()

  const bg = useColorModeValue('gray.700', 'black')

  return (
    <Container 
      as="footer" 
      maxW="full" 
      marginTop="20"
      bg={bg}
      color="white"
      centerContent
    >
      <Grid
        maxW="4xl"
        my={5}
        mt="10"
        gridGap={10}
        alignContent="center"
        gridTemplateAreas={{md: '"about col1 col2"', base: '"about" "col1" "col2"'}}
        gridTemplateColumns={{md: '2fr 1fr 1fr', base: '1fr'}}
      >
        <Box gridArea="about">
          {/* <img src="http://marcus.uib.no/img/UiBmerke_grayscale.svg" /> */}
          <Text>
            Kølle-utstillingen er en del av MARCUS, som er Spesialsamlingene til Universitetsbiblioteket i Bergen sin portal til digitaliserte manuskript, fotografi, diplomer og mye mer. Oppkalt etter Marcus Selmer, Bergens første fotograf.
          </Text>
        </Box>

        <Box gridArea="col1">
          <Heading size="sm">Manuskript- og librarsamlingen</Heading>
        </Box>

        <Box gridArea="col2">
          <Heading size="sm">Billedsamlingen</Heading>
        </Box>
      </Grid>
      
      <Box maxW="4xl">
        <Text>Mer tekst, rettigheter og sånt</Text>
      </Box>
    </Container>
  )
}
