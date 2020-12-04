export default {
  name: 'toc',
  type: 'document',
  title: 'Table of Contents',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [{ type: 'tocSection' }],
    },
  ],
};
