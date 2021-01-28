import React from 'react'
import {ReactiveList, SelectedFilters} from '@appbaseio/reactivesearch'
import styled from 'styled-components'
import Card from './Card'

const container = styled.div`
  background: white;
  border: 1px solid #e8e8e8;
  padding: 20px;
  @media (max-width: 576px) {
    padding: 10px;
  }
  a {
    height: auto;
    box-shadow: none;
    border-radius: 0;
    border: 1px solid #e8e8e8;
    &:hover {
      box-shadow: none;
    }
    @media (max-width: 420px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`

const Results = () => {
  return (
    <div className={container}>
      <SelectedFilters />
      <ReactiveList
        pagination
        paginationAt="both"
        componentId="results"
        react={{
          and: ['search', 'digitized', 'zoom', 'types', 'makers'],
        }}
        dataField="identifier"
      >
        {({loading, data, error}) => {
          if (loading) {
            return <p>Loading...</p>
          }
          if (error) {
            return <p>Something Went Wrong!</p>
          }
          if (data.length) {
            return (
              <ReactiveList.ResultCardsWrapper>
                {data.map((item) => (
                  <Card key={item._id} item={item} />
                ))}
              </ReactiveList.ResultCardsWrapper>
            )
          } else {
            return <p>No Results Found</p>
          }
        }}
      </ReactiveList>
    </div>
  )
}

export default Results
