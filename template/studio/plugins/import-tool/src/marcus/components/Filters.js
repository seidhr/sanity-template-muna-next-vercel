import React from 'react'
import {MultiList, SingleList} from '@appbaseio/reactivesearch'

const buttonStyles = `
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
`

const filterWrapper = isVisible => `
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
    <SingleList
      dataField='type.exact'
      title='Types'
      componentId='types'
      queryFormat='and'
    />
    <MultiList
      dataField='maker.exact'
      showSearch={false}
      title='Makers'
      componentId='makers'
      queryFormat='or'
    />
  </>
)

class Filters extends React.Component {
  constructor () {
    super()
    this.state = {
      isVisible: false
    }
  }

  handleMobileView = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }))
  };

  render () {
    const {isVisible} = this.state
    return (
      <div>
        <button
          type='button'
          onClick={this.handleMobileView}
          className={buttonStyles}
        >
          {`Show ${isVisible ? 'Results' : 'Filters'}`}
        </button>
        <div className={filterWrapper(isVisible)}>
          <AllFilters />
        </div>
      </div>
    )
  }
}

export default Filters
