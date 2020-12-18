import {timespan, tookPlaceAt, referredToBy, motivatedBy} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent group

export default {
  name: 'dissolution',
  title: 'Oppløsing',
  titleEN: 'Dissolution',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'eventType'}],
        },
      ],
    },
    timespan,
    tookPlaceAt,
    motivatedBy,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
    },
    prepare(selection) {
      const {type} = selection
      return {
        title: `${capitalize(type)}`,
      }
    },
  },
}
