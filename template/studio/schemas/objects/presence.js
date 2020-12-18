import {label, definedByGeoJSON} from '../props'

export default {
  name: 'presence',
  title: 'Tilstedeværelse',
  titleEN: 'Presence',
  description:
    'Used to define temporal snapshots at a particular time-span, such as the extent of the Roman Empire at 33 B.C.',
  type: 'object',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Minimumsregistrering',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    label,
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      description: 'A shortish description',
      type: 'localeBlockSimple',
    },
    {
      name: 'temporalProjection',
      title: 'Tidsspenn',
      titleEN: 'Timespan',
      type: 'array',
      of: [{type: 'timespan'}],
    },
    {
      name: 'spatialProjection',
      title: 'Fant sted ved',
      titleEN: 'Took place at',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'place'}]}],
    },
    definedByGeoJSON,
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title.nor,
      }
    },
  },
}
