import {timespan, tookPlaceAt, contributionAssignedBy} from '../../props'
export default {
  name: 'beginningOfExistence',
  title: 'Start på eksistens',
  titleEN: 'Beginning of existence',
  type: 'object',
  fields: [
    contributionAssignedBy,
    timespan, 
    tookPlaceAt
  ],
  preview: {
    select: {
      contributor: 'contributionAssignedBy.0.assignedActor.label',
      contributorName: 'contributionAssignedBy.0.usedName.content',
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
    },
    prepare(selection) {
      var dayjs = require('dayjs')
      var _ = require('lodash')
      var localizedFormat = require('dayjs/plugin/localizedFormat')
      dayjs.extend(localizedFormat)
      require('dayjs/locale/nb')

      const {contributor, contributorName, bb, eb, date, be, ee} = selection
      var dates = _.pickBy({bb: bb, eb: eb, date: date, be: be, ee: ee}, _.identity)

      let d = Object.assign(
        {},
        ...Object.keys(dates).map((k) => ({[k]: dayjs(dates[k]).locale('nb').format('LL')})),
      )

      return {
        title: `Beginning of existence, by ${contributor || contributorName || 'unknown'}`,
        subtitle:
          `${d.date || ''}${d.bb || ''}${d.bb && d.eb ? '~' : ''}${d.eb || ''}` +
          `${(d.bb || d.eb) && (d.be || d.ee) ? ' / ' : ''}` +
          `${d.be || ''}${d.be && d.ee ? '~' : ''}${d.ee || ''}`,
      }
    },
  },
}
