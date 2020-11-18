import React, {useState} from 'react'
import {MultiList, SingleList, ToggleButton} from '@appbaseio/reactivesearch'
import styled from 'styled-components'

/* const buttonStyles = styled.button`
  padding: 15px;
  border: 0;
  outline: 0;
  display: none;
  position: fixed;
  border-radius: 2px;
  background: #08c;
  bottom: 10px;
  left: 50%;
  z-index: 20;
  transform: translateX(-50%);
  @media (max-width: 576px) {
    display: block;
  }
` */

const filterWrapper = (isVisible) => styled.div`
  position: sticky;
  top: 80px;
  border: 1px solid #e8e8e8;
  background: white;
  overflow-y: scroll;
  height: calc(100vh - 80px);
  > div {
    margin: 30px auto;
    width: 90%;
  }
  @media (max-width: 576px) {
    display: ${isVisible ? 'block' : 'none'};
    position: fixed;
    width: 100%;
    top: 70px;
    height: calc(100vh - 70px);
  }
`

const AllFilters = () => (
  <>
    <ToggleButton
      componentId='digitized'
      dataField='isDigitized'
      data={[
        {label: 'Only digitized', value: 'Digitalisert'}
      ]}
      title='Show'
      defaultValue={['Digitalisert']}
      multiSelect
      showFilter
      filterLabel='Digitized'
      URLParams={false}
    />
    <ToggleButton
      componentId='zoom'
      dataField='hasZoom'
      data={[
        {label: 'With zoom', value: 'Med DeepZoom'}
      ]}
      defaultValue={['Med DeepZoom']}
      title=''
      showFilter
      filterLabel='Digitized'
      URLParams={false}
    />
    <SingleList
      dataField='type.exact'
      title='Types'
      componentId='types'
      queryFormat='and'
      react={{
        and: ['digitized', 'zoom']
      }}
    />
    <MultiList
      dataField='maker.exact'
      showSearch={false}
      title='Makers'
      componentId='makers'
      queryFormat='or'
      react={{
        and: ['search', 'digitized', 'zoom', 'types', 'makers']
      }}
    />
  </>
)

const Filters = () => {
  // eslint-disable-next-line no-unused-vars
  const [isVisible, setIsVisible] = useState(true)

  /* const handleMobileView = () => {
    setIsVisible(!isVisible)
  } */

  return (
    <div>
      {/* <button
        type='button'
        onClick={handleMobileView}
        className={buttonStyles}
      >
        {`Show ${isVisible ? 'Results' : 'Filters'}`}
      </button> */}
      <div className={filterWrapper(isVisible)}>
        <AllFilters />
      </div>
    </div>
  )
}

export default Filters
