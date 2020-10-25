import React, { useEffect, useState } from "react";
import mirador from "mirador";
import { Box } from '@chakra-ui/core'


export default function Mirador(props) {
  const [manifest, setManifest] = useState([]);

  if(!props) {
    return null
  }

  const arrayToWindows = (arr) => {
    const windows = arr.map(window => (
      {
        allowFullscreen: true,
        manifestId: window,
      }))
      return windows[0]
    }
  
  useEffect(() => {
    if(props.manifest) {
      setManifest(arrayToWindows(props.manifest))
    }
    
    if(props.image) {    
      setManifest([{
        allowFullscreen: true,
        manifestId: `/api/manifest/${props.image}`,
        maximized: true
      }])
    }
    
    console.log(JSON.stringify(manifest, null, 2))
    
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
      windows: manifest,
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
    return () => {
      setManifest([])
      console.log('unmounting...');
    }
  },[])

  return (
    <Box position="relative" h={700}>
      <Box h="100%" id="mirador" />
    </Box>
  )
}
