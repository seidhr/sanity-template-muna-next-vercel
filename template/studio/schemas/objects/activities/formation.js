import {timespan, tookPlaceAt, referredToBy, motivatedBy} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent group

export default {
  name: 'formation',
  title: 'Opprettelse',
  titleEN: 'Formation',
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
    {
      name: 'formedFrom',
      title: 'Opprettet fra',
      titleEN: 'Formed from',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'group'}]}],
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
