import React from 'react'
import { Link } from 'part:@sanity/base/router'
import { FcSupport } from 'react-icons/fc'
import {timespan, tookPlaceAt, referredToBy, carriedOutBy} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

export default {
  title: 'Treatment',
  name: 'treatment',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    carriedOutBy,
    timespan,
    tookPlaceAt,
    referredToBy,
    {
      name: 'assessedBy',
      title: 'Vurdert av',
      titleEN: 'Assessment',
      description: (<span>Legg til en vurdering av behandlingen. Var det en suksess? <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#assessment'}><FcSupport /></Link></span>),
      descriptionEN: (<span>Add an assessment of the treatment, was it a success? <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#assessment'}><FcSupport /></Link></span>),
      type: 'array',
      of: [{type: 'treatmentAssessment'}],
    },
  ],
  preview: {
    select: {
      date: 'productionDate',
    },
    prepare(selection) {
      const {date} = selection
      return {
        title: `Behandling${date ? ', datert ' + date : ''}`,
      }
    },
  },
}
