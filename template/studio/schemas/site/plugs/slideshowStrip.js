export default {
  name: 'slideshowStrip',
  type: 'object',
  title: 'Slideshow-stripe',
  titleEN: 'Slideshow strip',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'items',
      title: 'Vinduer',
      titleEN: 'Items',
      type: 'array',
      of: [{type: 'madeObject'}],
    },
    {
      name: 'heading',
      title: 'Tittel',
      titleEN: 'Heading',
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
      title: 'heading',
    },
    prepare: ({title}) => ({
      title: title,
      subtitle: `Slideshow stripe`,
    }),
  },
}
