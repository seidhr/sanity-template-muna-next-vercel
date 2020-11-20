import React from 'react'
import {ReactiveBase} from '@appbaseio/reactivesearch'
import styled from 'styled-components'
import Filters from './components/Filters'
import Results from './components/Results'
import Search from './components/Search'

function SearchMarcus() {
  const marcus = 'https://jambo.uib.no/elasticsearch'

  return (
    <ReactiveBase app="marcus-prod" url={marcus}>
      <Search />
      <Wrapper>
        <Filters />
        <Results />
      </Wrapper>
    </ReactiveBase>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  padding: 0.5em 0;
  grid-gap: 0.5em;
  @media (max-width: 1240px) {
    grid-template-columns: 0.3fr 1fr;
  }
  @media (max-width: 960px) {
    grid-template-columns: 0.6fr 1fr;
  }
  @media (max-width: 576px) {
    padding: 0;
    grid-template-columns: auto;
  }
`

export default SearchMarcus
