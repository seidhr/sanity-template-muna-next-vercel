import {extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: 'EB Garamond, sans-serif',
    heading: 'Montserrat, serif',
    mono: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  styles: {
    global: {
      p: {
        fontSize: '1.25em',
      },
      blockquote: {
        color: 'red.300',
      },
    },
  },
})

export default theme
