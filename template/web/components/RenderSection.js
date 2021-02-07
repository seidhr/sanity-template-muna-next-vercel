import React from 'react'
import PropTypes from 'prop-types'
import {upperFirst} from 'lodash'
import * as SectionComponents from './Sections'

function resolveSections(section) {
  const Section = SectionComponents[upperFirst(section._type)]

  if (Section) {
    return Section
  }

  console.error('Cant find section', section) // eslint-disable-line no-console
  return null
}

function RenderSections(props) {
  const {sections} = props

  const filteredSections = sections.filter((x) => x._type)

  if (!filteredSections) {
    console.error('Missing section')
    return <div>Missing sections</div>
  }

  return (
    <>
      {filteredSections.map((section) => {
        const SectionComponent = resolveSections(section)
        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>
        }
        return <SectionComponent {...section} key={section._key} />
      })}
    </>
  )
}

RenderSections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    }),
  ),
}

export default RenderSections
