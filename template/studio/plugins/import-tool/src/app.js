import React, {useReducer, useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate';
// import fetch from 'unfetch'
import Header from './components/Header'
import Preview from './components/Preview'
import Search from './components/Search'
import styles from './ImportTool.css'
import {searchReducer} from './reducers/searchReducer'
import chooseItemNB from './apis/nb'

const IMPORT_API_URL = 'https://api.nb.no/catalog/v1/items/?'

export const initialState = {
  sourceAPI: 'nb',
  loading: true,
  searchParameter: '',
  items: [],
  page: 0,
  totalElements: 0,
  limit: 30,
  errorMessage: null
}


const App = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const [searchParameter, setSearchParameter] = useState('')
  
  useEffect(() => {
    fetch(IMPORT_API_URL + new URLSearchParams({
      page: state.page,
      size: state.limit,
      digitalAccessibleOnly: true}))
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: 'SEARCH_SUCCESS',
          payload: jsonResponse._embedded.items,
          totalElements: jsonResponse.page.totalElements
        })
      })
  }, [])


  const handlePageClick = (data) => {
    let selected = data.selected;
    let page = selected;

    dispatch({
      type: 'SEARCH_REQUEST'
    })

    fetch(IMPORT_API_URL + new URLSearchParams({
      q: state.searchParameter,
      page: page,
      size: state.limit,
      digitalAccessibleOnly: true}))
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.page && jsonResponse.page.totalElements) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse._embedded.items,
            totalElements: jsonResponse.page.totalElements,
            page: page
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
            error: jsonResponse.Error
          })
        }
      })
  };


  const search = (searchValue) => {
    setSearchParameter(searchValue)

    dispatch({
      type: 'SEARCH_REQUEST'
    })

    fetch(IMPORT_API_URL + new URLSearchParams({
      q: searchValue,
      page: 0,
      size: state.limit,
      digitalAccessibleOnly: true}))
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.page && jsonResponse.page.totalElements) {
          dispatch({
            type: 'SEARCH_SUCCESS',
            payload: jsonResponse._embedded.items,
            totalElements: jsonResponse.page.totalElements,
            page: 0
          })
        } else {
          dispatch({
            type: 'SEARCH_FAILURE',
            error: jsonResponse.Error
          })
        }
      })
  }

  const {items, totalElements, page, limit, errorMessage, loading} = state

  return (
    <div className={styles.container}>
      <Header />
      <p>{totalElements}</p>
      <Search search={search} />
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          forcePage={state.page}
          pageCount={totalElements / limit}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          containerClassName={styles.pagination}
          pageClassName={styles.page}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          breakClassName={styles.break}
          activeClassName={styles.active}
          onPageChange={handlePageClick}
          activeClassName={styles.active} />
      <div className={styles.grid}>
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className='errorMessage'>{errorMessage}</div>
        ) : (
          items.map((item) => (
            <Preview key={item.id} item={item} searchValue={searchParameter} onClick={chooseItemNB} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
