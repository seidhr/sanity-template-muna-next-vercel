export default {
  name: 'socialCollection',
  type: 'object',
  title: 'Social collection',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'items',
      title: 'Objekt',
      titleEN: 'Items',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [{type: 'social'}],
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({items}) => ({
      title: 'Social testimoinal collection',
      subtitle: `${items.length} tweet(s)`,
    }),
  },
}
