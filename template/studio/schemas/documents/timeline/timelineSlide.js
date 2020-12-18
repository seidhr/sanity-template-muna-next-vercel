import {timespan, timespanSingleton} from '../../props'
import {timespanAsString} from '../../helpers/helpers'

// TODO: Finish timeline with references to internal stuff and external. +datamodell
// See http://timeline.knightlab.com/docs/json-format.html#json-slide for more info

export default {
  title: 'Timeline slide',
  name: 'timelineSlide',
  type: 'object',
  fields: [
    {
      name: 'headline', // path: title.text.heading
      title: 'Tittel',
      titleEN: 'Headline',
      type: 'localeString',
    },
    {
      name: 'text', // path: title.text.text
      title: 'Tekst',
      titleEN: 'Text',
      type: 'localeBlock',
    },
    {
      name: 'media',
      title: 'Media',
      titleEN: 'Media',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'madeObject'}],
        },
        {type: 'mediaObject'},
        {type: 'externalMediaObject'},
      ],
      validation: (Rule) => Rule.length(1).error('You can only register one media object'),
    },
    timespanSingleton,
    {
      name: 'group',
      title: 'Gruppe',
      titleEN: 'Group',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.length(1).error('An event can only be in one group!'),
    },
    {
      name: 'background',
      title: 'Bakgrunn',
      titleEN: 'Background',
      type: 'background',
    },
  ],
  preview: {
    select: {
      title: 'headline.nor',
      bb: 'timespan.beginOfTheBegin',
      eb: 'timespan.endOfTheBegin',
      date: 'timespan.date',
      be: 'timespan.beginOfTheEnd',
      ee: 'timespan.endOfTheEnd',
    },
    prepare(selection) {
      const {title, bb, eb, date, be, ee} = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      return {
        title: title,
        subtitle: timespan,
      }
    },
  },
}
