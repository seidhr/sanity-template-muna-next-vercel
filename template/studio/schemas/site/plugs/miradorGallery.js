export default {
  name: 'miradorGallery',
  type: 'object',
  title: 'Mirador gallery',
  fields: [
    {
      type: 'boolean',
      name: 'disabled'
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'description',
      type: 'simpleBlockContent'
    },
    {
      name: 'items',
      type: 'array',
      validation: Rule => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "madeObject" }],
        },
      ],
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare: ({title}) => ({
      title: title,
      subtitle: `Mirador gallery`
    })
  }
}
