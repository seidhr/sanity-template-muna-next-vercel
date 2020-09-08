import React, { useState, useCallback } from 'react'
import Input from "part:@sanity/components/textinputs/default"
import useSWR from 'swr'
import fetch from 'unfetch'
import useDebounce from "./useDebounce"
import Preview from "./Preview"

// Sanity uses CSS modules for styling. We import a stylesheet and get an
// object where the keys matches the class names defined in the CSS file and
// the values are a unique, generated class name. This allows you to write CSS
// with only your components in mind without any conflicting class names.
// See https://github.com/css-modules/css-modules for more info.
import styles from './ImportTool.css'

const url = "https://api.nb.no/catalog/v1/items/?q=";
const fetcher = (...args) => fetch(...args, {
  params: {
    digitalAccessibleOnly: true,
    expand: 'metadata' 
  }
}).then((res) => {return res.json()});

export default function ImportTool() {
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounce(searchTerm, 500)
  const handleChange = useCallback(e => setSearchTerm(e.currentTarget.value), [setSearchTerm]);
  const handleClear = useCallback(() => setSearchTerm(''), [setSearchTerm]);

  const { data, error } = useSWR(`${url}"${debounced}"`, fetcher)

  if (error) return <h2> Some error occured </h2>;
  if (!error && !data) return <h2> No data! </h2>;
  
  return (
    <div className={styles.container}>
      <h1>ᛏᚨᚴᚨ - Import resources</h1>
      <p><strong>Work in progress!</strong> Import resources from api.nb.no into the Studio. Basic metadata will be imported such as title, description, thumbnail, reference to IIIF manifest and link back to the resource.</p>
      <Input placeholder={"Type phrase here"} id={"searchInput"} onChange={handleChange} value={searchTerm}
              isClearable
              onClear={() => handleClear("")}/>
      {/* <pre>{data && (JSON.stringify(data._embedded.items, null, 2))}</pre> */}
      
      <div className={styles.grid}>
        { data && data._embedded && data._embedded.items ? data._embedded.items.map(result => (
          <Preview src={result && result._links.thumbnail_large ? result._links.thumbnail_large.href : ''} item={result}
          />
        )) : ''}
        {/* { data && data._embedded && !data._embedded.items ? <p>Whoops! Found nothing!</p> : ''} */}
      </div>
    </div>
  )
}
