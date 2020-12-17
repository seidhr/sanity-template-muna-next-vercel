export default {
  type: 'object',
  name: 'uiComponentRef',
  title: 'UI component reference',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      type: 'string',
      name: 'name',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({title}) {
      return {
        title: `UI reference: ${title}`,
      }
    },
  },
}
