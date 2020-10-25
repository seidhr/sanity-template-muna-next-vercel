export default {
  title: 'Article',
  name: 'generalArticle',
  type: 'object',
  fields: [
    {
      type: 'boolean',
      name: 'disabled'
    },
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'simpleBlockContent'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: 'Article',
        subtitle: title
      }
    }
  }
}
