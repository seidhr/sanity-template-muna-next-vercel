import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function Map({data}) {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 60.7577,
    longitude: 7.4376,
    zoom: 5,
    bearing: 0,
    pitch: 30
  })

/*   let mapStyle = {
    version: 8,
    sources: {
      points: [JSON.parse(data[1].data.code)]
    },
    layers: [
      {
          id: 'my-layer',
          type: 'circle',
          source: 'points',
          paint: {
              'circle-color': '#f00',
              'circle-radius': 4
          }
      }
    ]
  }
  console.log(JSON.stringify(data, null, 2))
  console.log(JSON.stringify(mapStyle, null, 2))
 */
  return (
    <ReactMapGL
      // mapStyle={mapStyle}
      mapboxApiAccessToken=""
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}