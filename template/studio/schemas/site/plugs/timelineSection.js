import { coalesceLabel } from "../../helpers/helpers"

export default {
  name: 'timelineSection',
  title: 'Timeline',
  type: 'object',
  fields: [
    {
      name: 'item',
      type: 'reference',
      to: [{ type: 'timeline' }],
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'description',
      type: 'simpleBlockContent',
    },
  ],
  preview: {
    select: {
      title: 'item.headline',
      media: 'item.media',
    },
    prepare({ title, media }) {
      title = coalesceLabel(title)

      return {
        title: title,
        subtitle: 'Timeline',
        media: media,
      }
    },
  },
}
