import {timespan, carriedOutBy, tookPlaceAt, referredToBy} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

export default {
  name: 'transformation',
  title: 'Transformasjon',
  titleEN: 'Transformation',
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
    carriedOutBy,
    timespan,
    tookPlaceAt,
    referredToBy,
  ],
  preview: {
    select: {
      date: 'productionDate',
    },
    prepare(selection) {
      const {date} = selection
      return {
        title: `Transformasjon${date ? ', datert ' + date : ''}`,
      }
    },
  },
}
