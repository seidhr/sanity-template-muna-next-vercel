import * as React from 'react';
import { useState } from 'react';
import MapGL, {Source, Layer} from 'react-map-gl';
import { createGeojson, fitViewportToFeature } from './util';

const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export default function Map({data}) {
  if(!data) {
    return null
  }
  const geojson = createGeojson(data)
  const bounds = fitViewportToFeature(geojson, {padding: 20})

  const [viewport, setViewport] = useState({
    width: 200,
    height: 200,
    zoom: 5,
    bearing: 0,
    pitch: 40,
    ...bounds
  })

  return (
    <MapGL
      mapboxApiAccessToken={token}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      <Source type="geojson" data={geojson}>
        <Layer
          id="point"
          type="circle"
          paint={{
            'circle-radius': 10,
            'circle-color': '#007cbf'
          }} 
        />
        <Layer
          id="line"
          type="line"
          paint={{
            'line-width': 4,
            'line-color': '#007cbf'
          }} 
        />
      </Source>
    </MapGL>
  );
}