export default {
  title: 'External manifest',
  name: 'externalManifest',
  type: 'object',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'label',
      type: 'string',
    },
    {
      name: 'manifestUrl',
      type: 'url',
    },
    {
      name: 'canvasUrl',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'label',
      manifestUrl: 'manifestUrl',
    },
    prepare({title, manifestUrl}) {
      return {
        title: 'External manifest',
        subtitle: manifestUrl,
      }
    },
  },
}
