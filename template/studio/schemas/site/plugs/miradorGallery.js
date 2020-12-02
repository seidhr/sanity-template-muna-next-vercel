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
      name: 'items',
      type: 'array',
      of: [{type: 'miradorGalleryWindow'}],
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
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
      title: title,
      subtitle: `Mirador gallery`,
    }),
  },
}
