import React from 'react'
import { FcSupport } from 'react-icons/fc'
import client from 'part:@sanity/base/client'
import { Link } from 'part:@sanity/base/router'
import { licenseTypes } from '../vocabularies/defaultVocabularies'

export const editorialState = {
  name: 'editorialState',
  title: 'Status',
  titleEN: 'State',
  type: 'string',
  fieldset: 'state',
  validation: (Rule) => Rule.required(),
  options: {
    list: [
      { title: 'Til gjennomgang', value: 'review' },
      { title: 'Publisert', value: 'published' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
}

export const accessState = {
  name: 'accessState',
  title: 'Tilgangsstatus',
  titleEN: 'Access state',
  type: 'string',
  fieldset: 'state',
  validation: (Rule) => Rule.required(),
  options: {
    list: [
      { title: 'Privat', value: 'secret' },
      { title: 'Open', value: 'open' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
}

export const mainRepresentation = {
  title: 'Hovedrepresentasjon',
  titleEN: 'Main representation',
  name: 'mainRepresentation',
  description: (<span>Last opp eller velg et bilde. Dette er bildet som brukes som forhåndsvisning. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#main-representation'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Upload or choose a image. This image will be used for previews. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#main-representation'}><FcSupport /></Link></span>),
  type: 'mainRepresentation',
}

export const subjectOfManifest = {
  title: 'Hovedmanifest',
  titleEN: 'Main manifest',
  description: (<span>Hovedmanifestet til objektet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#main-representation'}><FcSupport /></Link></span>),
  descriptionEN: (<span>The main manifest of this object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#main-representation'}><FcSupport /></Link></span>),
  name: 'subjectOfManifest',
  type: 'iiifManifest',
}

export const iiifStructures = {
  title: 'IIIF structures',
  name: 'structures',
  type: 'array',
  description: (<span><strong>Eksperimentel:</strong> Legg til en IIIF struktur for dokument med flere sider.</span>),
  descriptionEN: (<span><strong>Experimental:</strong> Add a IIIF structure for documents with multiple pages/canvases.</span>),
  of: [{ type: 'range' }],
}

export const preferredIdentifier = {
  name: 'preferredIdentifier',
  title: 'Foretrukket identifikator',
  titleEN: 'Preferred identifier',
  description: (<span>Identifikatoren som er gjeldende for dette objektet. Alternative, eksterne eller ugyldige identifikatorer kan registreres i <i>Identifiert av </i>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#preferred-identifier'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Current, valid identifier for this object. Alternative, external or invalid ifentifiers can be add to <i>identified by</i>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#preferred-identifier'}><FcSupport /></Link></span>),
  type: 'string',
  validation: (Rule) =>
    Rule.required().custom(async (prefId) => {
      const docs = await client.fetch(
        `*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }`,
        { prefId },
      )
      return docs.length > 1 ? 'Value is not unique' : true
    }),
}

export const label = {
  name: 'label',
  title: 'Tittel',
  titleEN: 'Title',
  // description: (<span>Tittel. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#label'}><FcSupport /></Link></span>),
  // descriptionEN: (<span>Title. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#label'}><FcSupport /></Link></span>),
  type: 'localeString',
  validation: (Rule) => Rule.required(),
}

export const labelSingleton = {
  name: 'label',
  title: 'Tittel',
  titleEN: 'Title',
  // description: (<span>Tittel. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#label'}><FcSupport /></Link></span>),
  // descriptionEN: (<span>Title. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#label'}><FcSupport /></Link></span>),
  type: 'string',
  validation: (Rule) => Rule.required(),
}

/**
 * Identified by
 * P1_is_identified_by
 */

export const identifiedBy = {
  name: 'identifiedBy',
  title: 'Identifisert av',
  titleEN: 'Identified by',
  description: 'Legg til titler, navn eller identifikatorer.',
  descriptionEN: 'Add all known titles, name or identifiers.',
  description: (<span>Gjeldende, alternative, eksterne eller ugyldige identifikatorer. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#identified-by'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Current, alternative, external or invalid ifentifiers. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#identified-by'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'name' }, { type: 'identifier' }],
  options: {
    editModal: 'popup',
  },
}

/**
 * License
 * dct:license
 */

export const license = {
  name: 'license',
  title: 'Lisensiering',
  titleEN: 'License',
  description: 'Velg den korrekt lisensen eller rettighetserklæringen.',
  descriptionEN: 'Choose the correct lisense or mark',
  type: 'string',
  options: {
    list: licenseTypes,
  },
  validation: (Rule) => Rule.required(),
}

export const subject = {
  name: 'subject',
  title: 'Emne',
  titleEN: 'Subject',
  description: (<span>Emneord knyttet til dette objektet. Legg til <Link target="blank" href={'/desk/steder'}>nye emneord</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#subject'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Subjects related to this object. Add <Link target="blank" href={'/desk/steder'}>new subjects</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#subject'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'concept' }],
    },
  ],
}

export const referredToBy = {
  name: 'referredToBy',
  title: 'Beskrivelse',
  titleEN: 'Description',
  description: (<span>Objektet kan ha mange beskrivelser, korte og/eller lange. Tekstene kan types for ulike brukeformål. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#description'}><FcSupport /></Link></span>),
  descriptionEN: (<span>The object can have multiple descriptions of varying lengths and purposes. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#description'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'linguisticObject' }, { type: 'reference', to: [{ type: 'text' }] }],
  options: {
    editModal: 'fullscreen',
  },
}

export const relation = {
  name: 'relation',
  title: 'Relasjon',
  titleEN: 'Relation',
  description: 'Uspesifisert relasjon til en annen ting',
  descriptionEN: 'Unspecified relation',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'madeObject' },
        { type: 'actor' },
        { type: 'group' },
        { type: 'event' },
        { type: 'activity' },
      ],
    },
  ],
}

export const wasPresentAt = {
  name: 'wasPresentAt',
  title: 'Var tilstede ved',
  titleEN: 'Was present at',
  description: (<span>Dette objektet var tilstede ved en hendelse eller aktivitet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#was-present-at'}><FcSupport /></Link></span>),
  descriptionEN: (<span>This object was present at an event or activity. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#was-present-at'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'event' }, { type: 'activity' }],
    },
  ],
}

export const hasCurrentOwner = {
  name: 'hasCurrentOwner',
  title: 'Nåværende eier',
  titleEN: 'Current owner',
  description: (<span>Nåværende eier av dette objektet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#current-owner'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Current owner of this object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#current-owner'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'actor' }, { type: 'group' }],
    },
  ],
}

export const hasFormerOrCurrentOwner = {
  name: 'hasFormerOrCurrentOwner',
  title: 'Tidligere eller nåværende eier',
  title: 'Former or current owner',
  description: (<span>Tidligere eller nåværende eier av dette objektet. Brukes også for usikkert eierskap. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#former-or-current-owner'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Former or current owner of this object. Also used for uncertain ownership. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#former-or-current-owner'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'actor' }, { type: 'group' }],
    },
  ],
}

export const composedOf = {
  name: 'composedOf',
  title: 'Består av',
  titleEN: 'Composed of',
  description: (<span>Andre identifiserte objekt som er en del av dette objektet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#composed-of'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Other identified madeObjects this object is composed of. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#composed-of'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'madeObject' }] }],
}

export const isSubjectOf = {
  name: 'isSubjectOf',
  title: 'Omhandlet i',
  titleEN: 'Subject of',
  description: (<span><strong>Eksperimentel:</strong> Tekster om dette objektet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#subject-of'}><FcSupport /></Link></span>),
  descriptionEN: (<span><strong>Experimental:</strong> Texts that have this object as its main subject, both internal and other texts. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#subject-of'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'writtenText' }],
    },
  ],
}

export const depicts = {
  name: 'depicts',
  title: 'Avbilder',
  titleEN: 'Depicts',
  description: (<span>Avbildet på dette objektet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#depicts'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Depictions on this object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#depicts'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'madeObject' }, { type: 'actor' }, { type: 'group' }, { type: 'concept' }],
    },
  ],
}

export const represents = {
  name: 'represents',
  title: 'Representerer',
  titleEN: 'Represents',
  description: (<span>Hva dette motivet representerer. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#represents'}><FcSupport /></Link></span>),
  descriptionEN: (<span>What this visual image represents. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#represents'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'madeObject' }, { type: 'actor' }, { type: 'group' }, { type: 'concept' }],
    },
  ],
}

export const showsVisualObject = {
  name: 'showsVisualObject',
  title: 'Viser merke eller bilde',
  titleEN: 'Shown visual item',
  description: (<span>Motiv vist på dette objectet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#shown-visual-item'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Visual item shown on this object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#shown-visual-item'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'visualObject' }],
}

export const carries = {
  name: 'carries',
  title: 'Bærer verk',
  titleEN: 'Carries work',
  description: (<span>Verk som er representert i dette objektet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#carries'}><FcSupport /></Link></span>),
  descriptionEN: (<span>Work represented on this object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#carries'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'work' }] }],
}

export const measuredBy = {
  name: 'measurement',
  title: 'Måling',
  titleEN: 'Measured by',
  description: (<span><strong>Eksperimentel:</strong> Måling av objektet. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#measurement'}><FcSupport /></Link></span>),
  descriptionEN: (<span><strong>Experimental:</strong> Measurment of the object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#measurement'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'measurement' }],
}

export const hasDimension = {
  name: 'hasDimension',
  title: 'Har dimension',
  titleEN: 'Has dimension',
  description: (<span><strong>Eksperimentel:</strong> Objektets dimension. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#dimension'}><FcSupport /></Link></span>),
  descriptionEN: (<span><strong>Experimental:</strong> Dimension of the object. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#dimension'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'dimension' }],
}

export const consistsOf = {
  name: 'consistsOf',
  title: 'Laget av',
  titleEn: 'Consists of',
  description: (<span>Hvilket material objektet er laget av, for eksempel lær og/eller pergament. Legg til <Link target='blank' href={'/desk/typer;material'}>nytt material</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#consists-of'}><FcSupport /></Link></span>),
  descriptionEN: (<span>The material the item is produced with, eg. leather and-or parchment. Add <Link target='blank' href={'/desk/typer;material'}>new material</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#consists-of'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'material' }],
    },
  ],
}

export const usedGeneralTechnique = {
  name: 'usedGeneralTechnique',
  title: 'Brukte generell teknikk',
  titleEN: 'Used general technique',
  description: (<span>Teknikker eller metoder brukt i aktiviteten. Legg til <Link target='blank' href={'/desk/typer;technique'}>ny teknikk</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-general-technique'}><FcSupport /></Link></span>),
  descriptionEN: (<span>The techniques or methods that was employed in an activity. Add <Link target='blank' href={'/desk/typer;technique'}>new technique</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-general-technique'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'technique' }],
    },
  ],
}

export const usedSpecificTechnique = {
  name: 'usedSpecificTechnique',
  title: 'Brukte spesifikk teknikk',
  titleEN: 'Used spesific technique',
  description: (<span>Teknikker eller metoder brukt i aktiviteten. Legg til <Link target='blank' href={'/desk/samlingsadministrasjon;designOrProcedure'}>ny teknikk</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-spesific-technique'}><FcSupport /></Link></span>),
  descriptionEN: (<span>The techniques or methods that was employed in an activity. Add <Link target='blank' href={'/desk/samlingsadministrasjon;designOrProcedure'}>new technique</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-spesific-technique'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'designOrProcedure' }] }],
}

export const usedObjectOfType = {
  name: 'usedObjectOfType',
  title: 'Brukte objekt av type',
  titleEN: 'Used object of type',
  description: (<span>Objekttype som ble brukt i aktiviteten. Legg til <Link target='blank' href={'/desk/typer;objectType'}>ny objekttype</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-object-of-type'}><FcSupport /></Link></span>),
  descriptionEN: (<span>The object type that was used in an activity.. Add <Link target='blank' href={'/desk/typer;objectType'}>new object type</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-object-of-type'}><FcSupport /></Link></span>),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'objectType' }],
    },
  ],
}

export const usedSpecificObject = {
  name: 'usedSpecificObject',
  title: 'Brukte spesifikt objekt',
  titleEN: 'Used spesific object',
  description: (<span>Objekt som ble brukt i aktiviteten. Legg til <Link target='blank' href={'/desk/objekt'}>nytt objekt</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-spesific-object'}><FcSupport /></Link></span>),
  descriptionEN: (<span>The object that was used in an activity. Add a <Link target='blank' href={'/desk/objekt'}>new object</Link>. <Link target='blank' href={'https://docs.muna.xyz/docs/model/properties#used-spesific-object'}><FcSupport /></Link></span>),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'madeObject' }] }],
}

export const timespan = {
  name: 'timespan',
  title: 'Tidsspenn',
  titleEN: 'Timespan',
  type: 'array',
  of: [{ type: 'timespan' }],
  options: {
    editModal: 'fullscreen',
  },
  validation: (Rule) => Rule.length(1).warning('You should only register one timespan'),
}

export const timespanSingleton = {
  name: 'timespan',
  title: 'Tidsspenn',
  titleEN: 'Timespan',
  type: 'timespan',
  options: {
    editModal: 'fullscreen',
  },
}

export const carriedOutBy = {
  name: 'carriedOutBy',
  title: 'Utført av',
  titleEN: 'Carried out by',
  type: 'array',
  of: [{ type: 'actorInRole' }],
}

export const hadParticipant = {
  name: 'hadParticipant',
  title: 'Hadde medvirkende',
  titleEN: 'Had participant',
  type: 'array',
  of: [{ type: 'actorInRole' }],
}

export const tookPlaceAt = {
  name: 'tookPlaceAt',
  title: 'Skjedde ved',
  titleEN: 'Took place at',
  description: (
    <span>
      Hvor skjedde dette? Legg til{' '}
      <Link target="blank" href={'/desk/steder'}>
        nytt sted
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Where did this happen? Add{' '}
      <Link target="blank" href={'/desk/steder'}>
        a new place
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'place' }] }],
}

/**
 * skos:altLabel
 */
export const altLabel = {
  name: 'altLabel',
  title: 'Alternativt navn',
  titleEN: 'Alternative label',
  type: 'localeString',
}

/**
 * P35_has_identified
 */
export const hasIdentified = {
  name: 'hasIdentified',
  title: 'Identifiserte tilstander',
  titleEN: 'Has identified condition states',
  type: 'array',
  of: [{ type: 'conditionState' }],
}

export const valueSlider = {
  name: 'value',
  title: 'Verdi',
  titleEN: 'Value',
  description: '1 is horrible, 100 is MINT!',
  type: 'number',
  options: {
    layout: 'slider',
    range: { min: 1, max: 100, step: 1 },
  },
}

export const language = {
  name: 'language',
  title: 'Språk',
  titleEN: 'Language',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'language' }] }],
}

export const memberOf = {
  name: 'memberOf',
  title: 'Medlem av',
  titleEN: 'Member of',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'group' }] }],
}

/**
 * hasMember
 * la:has_member
 */
export const hasMember = {
  name: 'hasMember',
  title: 'Har deler',
  titleEN: 'Has member',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'madeObject' }] }],
}

/**
 * broader
 * skos:broader
 */
export const broader = {
  name: 'broader',
  title: 'Overordnet term',
  titleEN: 'Broader',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'typeClass' }] }],
}

export const narrower = {
  name: 'narrower',
  title: 'Underordnet term',
  titleEN: 'Narrower',
  description: 'Trenger vi narrower? Blir mye å registrere...',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'typeClass' }] }],
}

export const domain = {
  name: 'domain',
  title: 'Domene',
  titleEN: 'Domain',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'typeClass' }] }],
}

export const definedByGeoJSON = {
  name: 'definedByGeoJSON',
  title: 'GeoJSON',
  titleEN: 'GeoJSON',
  description: 'Lag et GeoJSON objekt eller lim inn en hel GeoJSON fil.',
  type: 'array',
  of: [{ type: 'geojsonFeatureCollection' }, { type: 'geojson' }],
}

export const transferredTitleTo = {
  name: 'transferredTitleTo',
  title: 'Overførte tittel til',
  titleEN: 'Transferred title to',
  description: '',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'group' }, { type: 'actor' }] }],
}

export const transferredTitleFrom = {
  name: 'transferredTitleFrom',
  title: 'Overførte tittel fra',
  titleEN: 'Transferred title from',
  description: '',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'group' }, { type: 'actor' }] }],
}

export const transferredTitleOf = {
  name: 'transferredTitleOf',
  title: 'Overførte tittel',
  titleEN: 'Transferred title of',
  description: '',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'madeObject' }, { type: 'collection' }],
    },
  ],
}

export const concerned = {
  name: 'concerned',
  title: 'Omhandler',
  titleEN: 'About',
  description: 'Which collection(s) or object(s) is this an assessment of.',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'madeObject' }, { type: 'collection' }],
    },
  ],
}

export const motivated = {
  name: 'motivated',
  title: 'Motiverte',
  titleEN: 'Motivated',
  type: 'array',
  of: [{ type: 'treatment' }],
}
