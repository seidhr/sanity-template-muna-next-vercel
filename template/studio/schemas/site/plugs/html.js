export default {
  type: 'object',
  name: 'html',
  title: 'HTML (deprecated)',
  description: 'Custom HTML',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      title: 'Title',
      description: 'Only for internal use',
      name: 'title',
      type: 'string',
    },
    {
      title: 'html',
      name: 'html',
      type: 'code',
      options: {
        language: 'html',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title,
        subtitle: 'Custom HTML',
      }
    },
  },
}
