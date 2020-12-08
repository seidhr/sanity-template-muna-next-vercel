import React, { useEffect } from 'react'
import mirador from 'mirador'
import { Box } from '@chakra-ui/react'
import { nanoid } from 'nanoid'

export default function Mirador(props) {
  if (!props) {
    return null
  }
  const ID = `mirador-${nanoid()}`

  const arrayToWindows = (data) => {
    if (data.manifest.length === 1) {
      const res = [
        {
          allowFullscreen: true,
          manifestId: data.manifest[0],
          maximized: true,
        },
      ]
      return res
    }
    if (data.manifest.length > 1) {
      const windows = data.manifest.map((window) => ({
        allowFullscreen: true,
        manifestId: window,
      }))
      return windows
    }
    return
  }

  useEffect(() => {
    const manifests = arrayToWindows(props)

    let config = {
      id: ID,
      createGenerateClassNameOptions: {
        productionPrefix: ID,
      },
      manifests: {
        test: {
          provider: 'Tarje Lavik',
        },
      },
      window: {
        defaultView: 'book',
      },
      windows: manifests,
      workspace: {
        showZoomControls: false,
      },
      selectedTheme: 'dark',
      themes: {
        dark: {
          palette: {
            type: 'dark',
            primary: {
              main: '#789a5b',
            },
            secondary: {
              main: '#789a5b',
            },
            shades: {
              dark: '#000000',
              main: '#424242',
              light: '#616161',
            },
          },
        },
        light: {
          palette: {
            type: 'light',
          },
        },
      },
      thumbnailNavigation: {
        defaultPosition: 'off',
      },
    }

    mirador.viewer(config)
  }, [])

  return (
    <Box position="relative" h={700}>
      <Box h="100%" id={ID} />
    </Box>
  )
}
