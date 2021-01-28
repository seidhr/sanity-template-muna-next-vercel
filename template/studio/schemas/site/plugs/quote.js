import jsonata from 'jsonata'
import { QuotePreview } from '../../components/preview/QuotePreview'

export default {
  name: 'quote',
  type: 'object',
  title: 'Quote',
  fields: [
    {
      name: 'disabled',
      title: 'Avslått?',
      titleEN: 'Disabled',
      type: 'boolean',
    },
    {
      name: 'content',
      type: 'quoteBlock',
    },
    {
      name: 'credit',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
      disabled: 'disabled',
    },
    prepare({title, content}) {
      return {
        title: title ? title : '',
        content: content ? content : '',
        type: 'Text'
      }
    },
    component: QuotePreview,
  },
}
