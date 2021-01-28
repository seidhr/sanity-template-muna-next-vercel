export default {
  title: 'Gallery manifest',
  name: 'miradorGalleryWindow',
  type: 'object',
  fieldsets: [
    {
      name: 'internal',
      title: 'Internt objekt',
      titleEN: 'Internal object',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'external',
      title: 'Eksternt objekt',
      titleEN: 'External object',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    {
      name: 'manifestRef',
      title: 'Manifest',
      titleEN: 'Manifest',
      type: 'reference',
      to: [{type: 'madeObject'}],
      fieldset: 'internal',
    },
    {
      name: 'manifestUrl',
      title: 'Manifest adresse',
      titleEN: 'Manifest URL',
      type: 'url',
      fieldset: 'external',
    },
    {
      name: 'canvasUrl',
      title: 'Canvas URL',
      titleEN: 'Canvas URL',
      type: 'url',
      fieldset: 'external',
    },
    {
      name: 'canvasNumber',
      title: 'Canvas nummer',
      titleEN: 'Canvas number',
      type: 'number',
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
