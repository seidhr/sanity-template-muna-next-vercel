import React from 'react'
import { Link } from 'part:@sanity/base/router'
import { FcSupport } from 'react-icons/fc'
import { GiCrackedGlass } from 'react-icons/gi'
import {
  editorialState,
  accessState,
  label,
  usedGeneralTechnique,
  usedSpecificTechnique,
  usedObjectOfType,
  usedSpecificObject,
  referredToBy,
  hasIdentified,
  concerned,
  motivated,
  carriedOutBy,
  timespan
} from '../../props'

/**
 * Report
 * A combination of E14_Condition_Assessment and E33_Linguistic_Object
 */

export default {
  title: 'Rapport',
  name: 'report',
  type: 'document',
  initialValue: {
    editorialState: 'draft',
    accessState: 'secret',
  },
  icon: GiCrackedGlass,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'partsAndContent',
      title: 'Felt relatert til deler eller innhold',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'technique',
      title: 'Felt relatert til teknikk',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'documentation',
      title: 'Dokumentasjon',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    editorialState,
    accessState,
    label,
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      description: (<span>Brukes til å <i>spesifisere</i> typen av ting. For eksempel <strong>Rapport</strong> klassifisert som <i>konververingsrapport</i>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#classified-as'}><FcSupport /></Link></span>),
      description: (<span>Used to <i>specify</i> the things type. Example: <strong>Report</strong> classified as <i>conservation report</i>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#classified-as'}><FcSupport /></Link></span>),
      type: 'array',
      fieldset: 'minimum',
      of: [
        {
          type: 'reference',
          to: [{ type: 'reportType' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    carriedOutBy,
    timespan,
    concerned,
    hasIdentified,
    motivated,
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: (<span>Hendelser og aktiviteter relatert til rapporten. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#activity-stream'}><FcSupport /></Link></span>),
      descriptionEN: (<span>Events and activities connected to this object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#activity-stream'}><FcSupport /></Link></span>),
      type: 'array',
      of: [{ type: 'measurement' }, { type: 'sampling' }, { type: 'treatment' }],
    },
    {
      ...usedGeneralTechnique,
      fieldset: 'technique',
    },
    {
      ...usedSpecificTechnique,
      fieldset: 'technique',
    },
    {
      ...usedObjectOfType,
      fieldset: 'technique',
    },
    {
      ...usedSpecificObject,
      fieldset: 'technique',
    },
    {
      name: 'images',
      title: 'Dokumentasjonsfotografi',
      titleEN: 'Documentation images',
      description: (<span>Bilder knyttet til rapporten som dokumentere det rapporten omhandler. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#documentation-images'}><FcSupport /></Link></span>),
      descriptionEN: (<span>Images that documents the subject of the report. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#documentation-images'}><FcSupport /></Link></span>),
      fieldset: 'documentation',
      type: 'array',
      of: [{ type: 'figure' }],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'files',
      title: 'Documentation files',
      titleEN: 'Dokumentasjonsfiler',
      description: (<span>Filer med utfyllende informasjon. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#documentation-files'}><FcSupport /></Link></span>),
      descriptionEN: (<span>Files with additional information. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#documentation-files'}><FcSupport /></Link></span>),
      fieldset: 'documentation',
      type: 'array',
      of: [{ type: 'file' }],
    },
    {
      name: 'consistsOf',
      title: 'Underrapport',
      titleEN: 'Sub report',
      description: (<span>Dersom det er flere selvstendige rapporter som inngår i en serie, legg til disse til her. Den overordene rapportens metadata bør reflektere at det er en samlepost. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#sub-report'}><FcSupport /></Link></span>),
      descriptionEN: (<span>If there is several indepentent reports that forms part of a larger rapport these can be added here. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#sub-report'}><FcSupport /></Link></span>),
      type: 'array',
      of: [{ type: 'report' }],
      options: {
        editModal: 'fullscreen',
      },
    },
  ],
  preview: {
    select: {
      type: 'hasType.0.label.nor',
      title: 'label.nor',
      blocks: 'description.nor',
      published: 'accessState',
    },
    prepare(selection) {
      const { type, title, blocks, published } = selection
      const block = (blocks || []).find((block) => block._type === 'block')
      const secret = published === 'secret' ? '🔒' : ''

      return {
        title: title,
        subtitle: secret + type,
        description: block
          ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : '',
      }
    },
  },
  orderings: [
    {
      title: 'Tittel, A-Å',
      name: 'title',
      by: [{ field: 'label', direction: 'desc' }],
    },
    {
      title: 'Tittel, Å-A',
      name: 'title',
      by: [{ field: 'label', direction: 'asc' }],
    },
  ],
}
