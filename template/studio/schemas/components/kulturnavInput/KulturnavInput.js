import React, {useState} from 'react'
import useSWR from 'swr'

import SearchableSelect from '@sanity/base/__legacy/@sanity/components'
import DefaultLabel from '@sanity/base/__legacy/@sanity/components'

import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

// import {formatDate} from './utils'

import styles from './KulturnavInput.module.css'

const url =
  'https://kulturnav.org/api/search/entity.dataset:2155319e-50c9-416a-ae85-3e6afc33ef4e,nativeCompoundName:'

const createPatchFrom = (value) => PatchEvent.from(value === '' ? unset() : set(value))

function searchKN(url, query) {
  return fetch(url + query)
    .then((r) => r.json())
    .then(
      (r) =>
        r.map((i) => ({
          /* _type: 'concept', */
          preferredIdentifier: i.uuid,
          label: i.caption.no || '',
          url: `https://kulturnav.org/${i.uuid}`,
        })),
      // .filter((meeting) => meeting.url),
    )
}

export default React.forwardRef((props, ref) => {
  const {type, value, onChange} = props
  const [query, setQuery] = useState()
  const {data: queryResult} = useSWR([url, `${query}*?lang=no`], searchKN)

  return (
    <div>
      <DefaultLabel>{type.title}</DefaultLabel>
      <SearchableSelect
        ref={ref}
        value={value === undefined ? 'Nei' : 'value'}
        items={queryResult || []}
        inputValue={(queryResult || []).find((item) => item._key === value)?.label}
        onChange={(selectedItem) => onChange(createPatchFrom(selectedItem))}
        onSearch={setQuery}
        // disabled={!queryResult || !queryResult.length}
        renderItem={(item) => (
          <div className={styles.item}>
            <span>{item.label}</span>
            <span>{item.url}</span>
          </div>
        )}
      />
    </div>
  )
})
