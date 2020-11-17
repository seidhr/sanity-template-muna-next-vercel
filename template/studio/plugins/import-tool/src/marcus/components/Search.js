import React from 'react'
import {DataSearch} from '@appbaseio/reactivesearch'

const navbarStyles = `
  padding: 0 25px;
  background: #08c;
  height: 70px;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  position: sticky;
  top: 0px;
  z-index: 20;
  grid-gap: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  .logo {
    color: white;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
  }
  input {
    font-size: 0.8em;
    padding: 10px 20px 10px 40px;
    width: 100%;
    outline: none;
    border: 0;
  }
`

const Navbar = () => {
  return (
    <div className={navbarStyles}>
      <DataSearch
        dataField={[
          'title',
          'label',
          'prefLabel',
          'subject',
          'maker',
          'spatial'
        ]}
        fieldWeights={[2, 1, 2, 2]}
        componentId='search'
        autosuggest={false}
        placeholder='Search ...'
      />
    </div>
  )
}

export default Navbar
