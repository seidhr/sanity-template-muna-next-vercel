export default {
  type: 'object',
  name: 'uiComponentRef',
  title: 'UI component reference',
  fields: [
    {
      type: 'boolean',
      name: 'disabled'
    },
    {
      type: 'string',
      name: 'name'
    }
  ],
  preview: {
    select: {
      title: 'name'
    },
    prepare({ title }) {
      return {
        title: `UI reference: ${title}`
      }
    }
  }
}
