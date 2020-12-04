export default {
  name: 'tocSection',
  type: 'object',
  title: 'Section',
  fields: [
    {
      type: 'reference',
      name: 'target',
      title: 'Target',
      to: [{ type: 'route' }],
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [{ type: 'tocLink' }],
    },
  ],
};