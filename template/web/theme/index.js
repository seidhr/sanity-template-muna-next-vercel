import { extendTheme } from "@chakra-ui/core"

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Montserrat, serif",
    mono: "Menlo, monospace",
  },
})

export default theme