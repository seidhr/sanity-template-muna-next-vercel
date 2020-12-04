export default {
  name: 'tocLink',
  type: 'object',
  title: 'Link',
  preview: {
    select: {
      title: 'title',
      targetTitle: 'target.title',
    },
    prepare: ({ title, targetTitle }) => ({
      title: title || targetTitle,
    }),
  },
  fields: [
    {
      type: 'reference',
      name: 'target',
      title: 'Target article',
      to: [{ type: 'route' }],
      description: 'No target article turns the item into a subheading.',
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'Override title from the target article.',
    },
    {
      type: 'array',
      name: 'children',
      title: 'Children',
      of: [{ type: 'tocLink' }],
    },
  ],
};
