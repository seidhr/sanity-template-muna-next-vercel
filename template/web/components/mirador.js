import React, { useEffect, useState } from "react";
import mirador from "mirador";
import { Box } from '@chakra-ui/core'


export default function Mirador(props) {
  const [manifest, setManifest] = useState('');

  if(!props) {
    return null
  }
  
  useEffect(() => {
    if(props.manifest) {
      setManifest(props.manifest)
    }
    
    if(props.image) {    
      setManifest(`/api/manifest/${props.image}`)
    }
    
    const config = {
      id: "mirador",
      manifests: {
        test: {
          provider: "Tarje Lavik"
        }
      },
      window: {
        defaultView: "book",
      },
      windows: [
        {
          allowFullscreen: true,
          manifestId: manifest,
          maximized: true
        }
      ],
      workspace: {
        showZoomControls: false,
      },
      selectedTheme: 'dark',
      themes: {
        dark: {
          palette: {
            type: 'dark',
            primary: {
              main: '#4db6ac',
            },
            secondary: {
              main: '#4db6ac',
            },
            shades: {
              dark: '#000000',
              main: '#424242',
              light: '#616161',
            }
          }
        },
        light: {
          palette: {
            type: 'light',
          }
        }
      },
      thumbnailNavigation: {
        defaultPosition: 'off',
      },
    }
    
    mirador.viewer(config);
    return () => console.log('unmounting...');
  },[manifest])

  return (
    <Box position="relative" h={700}>
      <Box h="100%" id="mirador" />
    </Box>
  )
}
