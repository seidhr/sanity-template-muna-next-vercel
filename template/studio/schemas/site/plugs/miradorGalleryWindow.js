export default {
  title: 'Gallery manifest',
  name: 'miradorGalleryWindow',
  type: 'object',
  fieldsets: [
    {
      name: 'internal',
      title: 'Internt object',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'external',
      title: 'Eksternt object',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    {
      name: 'manifestRef',
      type: 'reference',
      to: [{type: 'madeObject'}],
      fieldset: 'internal',
    },
    {
      name: 'manifestUrl',
      type: 'url',
      fieldset: 'external',
    },
    {
      name: 'canvasUrl',
      type: 'url',
      fieldset: 'external',
    },
  ],
  preview: {
    select: {
      internalManifest: 'manifestRef.label',
      manifestUrl: 'manifestUrl',
      media: 'manifestRef.mainRepresentation',
    },
    prepare({internalManifest, manifestUrl, media}) {
      return {
        title: internalManifest ? internalManifest : manifestUrl ? manifestUrl : '',
        media: media,
      }
    },
  },
}
