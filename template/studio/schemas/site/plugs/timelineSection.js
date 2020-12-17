import {coalesceLabel} from '../../helpers/helpers'

export default {
  name: 'timelineSection',
  title: 'Tidslinje',
  titleEN: 'Timeline',
  type: 'object',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'item',
      title: 'Objekt',
      titleEN: 'Item',
      type: 'reference',
      to: [{type: 'timeline'}],
    },
    {
      name: 'title',
      title: 'Tittel',
      titleEN: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      titleEN: 'Description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'item.headline',
      media: 'item.media',
    },
    prepare({title, media}) {
      title = coalesceLabel(title)

      return {
        title: title,
        subtitle: 'Tidslinje',
        media: media,
      }
    },
  },
}
