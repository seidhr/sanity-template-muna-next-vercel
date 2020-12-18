export default {
  name: 'geojsonFeature',
  title: 'Feature',
  type: 'object',
  fields: [
    {
      name: 'geometry',
      title: 'Geometri',
      titleEN: 'Geometry',
      type: 'geojsonPoint',
    },
    {
      name: 'properties',
      title: 'Egenskaper',
      titleEN: 'Propterties',
      type: 'geojsonProperties',
    },
  ],
  preview: {
    select: {
      type: 'properties.type',
    },
    prepare(selection) {
      const {type} = selection
      return {
        title: type || 'Point',
      }
    },
  },
}
