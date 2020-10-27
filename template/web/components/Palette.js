import { Box, Grid } from '@chakra-ui/core'

export default function Palette({colors}) {
  if(!colors) {
    return null
  }
  
  let palette = []

  if(colors) {
    Object.keys(colors).forEach(key => {palette.push(colors[key])})
  }

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={0}>
      {palette.map(color => (
        <Box bg={color.background} w="full" h="20px" >
        </Box>
      ))}
    </Grid>
  )
}
