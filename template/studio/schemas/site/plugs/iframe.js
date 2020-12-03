export default {
  type: 'object',
  name: 'iframe',
  title: 'Iframe',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'url',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title: title ? title : url,
        subtitle: 'iFrame'
      }
    }
  },
}
