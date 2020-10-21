import React, { useEffect } from "react";
import mirador from "mirador";
import { Box } from '@chakra-ui/core'


export default function Mirador(props) {
  useEffect(() => {
    const config = {
      id: "mirador",
      manifests: {
        test: {
          provider: "Tarje Lavik"
        }
      },
      window: {
        defaultView: "book"
      },
      windows: [
        {
          allowFullscreen: true,
          manifestId: props.manifest,
          maximized: true
        }
      ],
      thumbnailNavigation: {
        defaultPosition: 'off',
      },
    }
    
    mirador.viewer(config);
  })

  return (
    <Box position="relative" h={600}>
      <Box h="100%" id="mirador" />
    </Box>
  )
}
