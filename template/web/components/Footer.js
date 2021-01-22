import {Grid, Box, Container, Heading, Text} from '@chakra-ui/react'

export default function Footer() {
  return (
    <Container as="footer" maxW="full" marginTop="3em" centerContent>
      <Grid
        maxW="4xl"
        my={5}
        gridGap={10}
        alignContent="center"
        gridTemplateAreas={{xl: '"about col1 col2"', base: '"about", "col1", "col2"'}}
        gridTemplateColumns={{xl: '2fr 1fr 1fr', base: '2fr, 1fr, 1fr'}}
      >
        <Box gridArea="about">
          <img src="http://marcus.uib.no/img/UiBmerke_grayscale.svg" />
          <Text>
            Kølle-utstillingen er en del av MARCUS, som er Spesialsamlingene til Universitetsbiblioteket i Bergen sin portal til digitaliserte manuskript, fotografi, diplomer og mye mer. Oppkalt etter Marcus Selmer, Bergens første fotograf.
          </Text>
        </Box>

        <Box gridArea="col1">
          <Heading size="md">Manuskript- og librarsamlingen</Heading>
        </Box>

        <Box gridArea="col2">
          <Heading size="md">Billedsamlingen</Heading>
        </Box>
      </Grid>
      
      <Box maxW="4xl">
        <Text>Mer tekst, rettigheter og sånt</Text>
      </Box>
    </Container>
  )
}
