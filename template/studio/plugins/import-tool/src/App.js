import React from 'react'
import {HashRouter as Router, NavLink, Route} from 'react-router-dom'
import ArrowRight from 'part:@sanity/base/arrow-right'
import Button from 'part:@sanity/components/buttons/default'
import styles from './ImportTool.css'
import Header from './components/Header'
import SearchNB from './nb/SearchNB'
import SearchMarcus from './marcus/SearchMarcus'
// import SearchKulturnav from './kulturnav/SearchKulturnav'

const App = () => {
  return (
    <Router hashType="noslash">
      <div className={styles.container}>
        <Header />

        <div className={styles.apiContainer}>
          <Button
            icon={ArrowRight}
            kind="simple"
            padding="small"
            /* tone='navbar' */
          />
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/marcus">
            Marcus
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/nb">
            NB Digitalt
          </NavLink>
          {/* <NavLink activeClassName={styles.active} className={styles.navlink} to='/import-tool/kulturnav'>Kulturnav</NavLink> */}
        </div>

        {/* Route components are rendered if the path prop matches the current URL */}
        <Route path="/marcus">
          <SearchMarcus />
        </Route>

        <Route path="/nb">
          <SearchNB />
        </Route>

        {/* <Route path='/import-tool/kulturnav'>
          <SearchKulturnav />
        </Route> */}
      </div>
    </Router>
  )
}

export default App
