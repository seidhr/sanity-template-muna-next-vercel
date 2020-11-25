import {label} from '../props'
import {defaultFieldsets} from '../fieldsets'
import {coalesceLabel} from '../helpers/helpers'

export default {
  title: 'Feature Collection',
  name: 'geojsonFeatureCollection',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    // Foreign member not in the GeoJSON schema
    {
      name: 'label',
      title: 'Tittel',
      titleEN: 'Title',
      description: '',
      descriptionEN: '',
      fieldset: 'minimum',
      type: 'localeString',
    },
    {
      name: 'features',
      title: 'Features',
      titleEN: 'Features',
      type: 'array',
      of: [{type: 'geojsonFeature'}],
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const {title} = selection
      const label = coalesceLabel(title)

      return {
        title: label || 'GeoJSON Feature Collection',
      }
    },
  },
}
