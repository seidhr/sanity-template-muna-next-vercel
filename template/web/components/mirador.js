import React, { useEffect } from "react";
import mirador from "mirador";

export default function Mirador(props) {
  useEffect(() => {
    const {manifest} = props
    const config = {
      id: "mirador",
      manifests: {
        test: {
          provider: "Tarje Lavik"
        }
      },
      windows: [
        {
          loadedManifest: manifest
        }
      ]
    }
    
    mirador.viewer(config);
  })

  return (
    <div id="mirador" />
  )
}
