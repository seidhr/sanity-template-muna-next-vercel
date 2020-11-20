export default {
  name: 'testimonial',
  type: 'object',
  title: 'Testimonial',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'url',
      type: 'url',
    },
    {
      name: 'image',
      type: 'image',
    },
    {
      name: 'quote',
      type: 'quote',
    },
    {
      name: 'tweet',
      type: 'url',
      description: 'Tweet to embed',
    },
  ],
  preview: {
    select: {
      name: 'name',
      media: 'image',
    },
    prepare({name, media}) {
      return {
        title: 'Testimonial',
        subtitle: name,
        media,
      }
    },
  },
}
