export default {
  name: 'miradorGallery',
  type: 'object',
  title: 'Mirador gallery',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'items',
      type: 'array',
      of: [{type: 'miradorGalleryWindow'}],
    },
    {
      name: 'description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({title}) => ({
      title: `Mirador gallery`,
      subtitle: title,
    }),
  },
}
