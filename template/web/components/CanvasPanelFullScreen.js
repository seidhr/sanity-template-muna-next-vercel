import React, {useEffect} from 'react'
import {Box} from '@chakra-ui/react'
import { PatchworkPlugin } from '@canvas-panel/patchwork-plugin/umd/@canvas-panel/patchwork-plugin'
import {
  Manifest,
  CanvasProvider,
  Viewport,
  StaticImageViewport,
  SingleTileSource,
  OpenSeadragonViewport,
  SizedViewport,
  functionOrMapChildren,
  AnnotationDetail,
  FullPageViewport,
  AnnotationRepresentation,
  AnnotationSelector,
} from '@canvas-panel/core';

const CanvasPanelFullScreen = React.forwardRef(({manifest}, ref) => {
  if (!manifest) {
    return null
  }

  return (
    <Box position="relative" maxh={700}>
    {/* <PatchworkPlugin 
        manifest={manifest[0]} 
        title="Testing title" 
        cssClassPrefix="patchwork-"
        maxHeight={700}
        maxWidth={1200}/> */}
      <Manifest url={manifest[0]}>
        <CanvasProvider startCanvas={0}>
          <Viewport maxWidth={1200}>
            <StaticImageViewport
              viewportController={true}
              maxHeight={700}
              maxWidth={1200}
            />
          </Viewport>
        </CanvasProvider>
      </Manifest>
    </Box>
  )
})

export default CanvasPanelFullScreen