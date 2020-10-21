import React, { useEffect } from "react";
import mirador from "mirador";
import { Box } from '@chakra-ui/core'

async function getImageInfo (image) {
  const canvas = image.replace("production", "production/iiif")
  const res = await fetch(`${canvas}/info.json`)
  const data = await res.json();
  console.log(JSON.stringify(data))
  return data
}

export default function Mirador(props) {
  if(!props) {
    return null
  }

  let manifest = ""
  
  if(props.manifest) {
    manifest = props.manifest
  }


  if(props.image) {
    const canvas = getImageInfo(props.image).then(res => {return res})
    const d = canvas

    let proxyManifest = {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "https://example.com/my-manifest",
      "@type": "sc:Manifest",
      sequences: []
    }
    let seq = {
      "@context": "http://iiif.io/api/presentation/2/context.json",
      "@id": "https://example.com/my-sequence",
      "@type": "sc:Sequence",
      canvases: []
    }
    seq.canvases.push(d)
    proxyManifest.sequences.push(seq)
    manifest = proxyManifest
  }

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
          manifestId: manifest,
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
