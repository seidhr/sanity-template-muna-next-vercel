import React from "react"
import {Link} from 'part:@sanity/base/router'
import {BsFillQuestionCircleFill} from 'react-icons/bs'
import {valueSlider} from '../props'

export default {
  name: 'conditionState',
  title: 'Tilstandsstatus',
  titleEN: 'Condition state',
  type: 'object',
  fields: [
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{type: 'conditionType'}],
      validation: (Rule) => Rule.required(),
    },
    valueSlider,
    {
      name: 'attributes',
      title: 'Egenskaper',
      titleEN: 'Attributes',
      description: 'Eksempel på custom felt for spesialistvurderinger',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Missing', value: 'missing'},
          {title: 'Partial remains', value: 'partialRemains'},
        ],
      },
    },
    {
      name: 'images',
      title: 'Dokumentasjonsfotografi',
      titleEN: 'Documentation images',
      description: (
        <span>
          Bilder knyttet til rapporten som dokumentere det rapporten omhandler.{' '}
          <Link
            target="blank"
            href={'https://docs.muna.xyz/docs/model/properties#documentation-images'}
          >
            <BsFillQuestionCircleFill />
          </Link>
        </span>
      ),
      descriptionEN: (
        <span>
          Images that documents the subject of the report.{' '}
          <Link
            target="blank"
            href={'https://docs.muna.xyz/docs/model/properties#documentation-images'}
          >
            <BsFillQuestionCircleFill />
          </Link>
        </span>
      ),
      type: 'array',
      of: [{type: 'digitalImageObject'}],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      type: 'hasType.label.nor',
      value: 'value',
    },
    prepare(selection) {
      const {type, value} = selection
      return {
        title: type + ': ' + value + ' / 100',
      }
    },
  },
}
