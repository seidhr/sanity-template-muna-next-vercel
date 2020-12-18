import React from 'react'
import {Link} from 'part:@sanity/base/router'
import {FcSupport} from 'react-icons/fc'
import {timespan, referredToBy, carriedOutBy, tookPlaceAt} from '../../props'
import {defaultFieldsets} from '../../fieldsets'

export default {
  title: 'Treatment assessment',
  name: 'treatmentAssessment',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    carriedOutBy,
    timespan,
    {
      name: 'success',
      title: 'Suksess?',
      titleEN: 'Success?',
      type: 'boolean',
    },
    tookPlaceAt,
    referredToBy,
    {
      name: 'images',
      title: 'Documentasjonsfotografi',
      titleEN: 'Documentation images',
      description: (
        <span>
          Bilder som dokumenterer behandlingsresultatet.{' '}
          <Link
            target="blank"
            href={'https://docs.muna.xyz/docs/model/properties#documentation-images'}
          >
            <FcSupport />
          </Link>
        </span>
      ),
      descriptionEN: (
        <span>
          Images that documents the results of the treatment.{' '}
          <Link
            target="blank"
            href={'https://docs.muna.xyz/docs/model/properties#documentation-images'}
          >
            <FcSupport />
          </Link>
        </span>
      ),
      fieldset: 'documentation',
      type: 'array',
      of: [{type: 'figure'}],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      date: 'productionDate',
    },
    prepare(selection) {
      const {date} = selection
      return {
        title: `Assessed${date ? ', dated ' + date : ''}`,
      }
    },
  },
}
