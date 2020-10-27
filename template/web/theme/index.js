import { extendTheme } from "@chakra-ui/core"

const theme = extendTheme({
  fonts: {
    body: "EBGaramond, sans-serif",
    heading: "Montserrat, serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  styles: {
    global: {
      p: {
        fontSize: "1.25em"
      },
    }
  }
})

export default theme