import React from 'react';
import './NavBar.scss';
import moment from 'moment';
import { Link} from "react-router-dom";

export const NavBar = (props) => {
    return (
        <nav className="nav-bar">
        <div className="nav-bar-container">
          <div className="search-container">
            <div className="inner-search-container">

              <div className="day-information">
                <h5 className="app-title">{moment().format('LLL')}</h5>
              </div>

                <select 
                  value={props.searchedItems.category}
                  onChange={(event) => {props.updateSearchCategory(event)}}>
                  <option 
                    placeholder='category'
                    value=''>categories</option>
                    {props.injectOptionsCategories()}
                </select>

                <input 
                  value= {props.query}
                  onChange={props.updateSearchQuery}
                  placeholder='search'
                  name='searchedItem'
                  type="text" 
                  className="search-bar"/>
                  <i className="fas fa-search"
                    onClick={props.findUserStory}
                  ></i>
            </div>
            {props.error && <p className="error-message">{props.error}</p>}
          </div>

          <div className="interactive-controls">
            <div className="find-date">
                <input 
                  placeholder="MM/DD/YYYY"
                  type="text"/>
                <button className="find-button">search</button>
            </div>
            <div className="buttons-container">

              <Link
                to='/home'>
                <button 
                className="app-title">
                home
                </button>
              </Link>

              <Link
                to='/my_reads'>
                <button 
                onClick={props.saveToLocalStorage}
                className="app-title">My reads</button>
              </Link>

              {props.laterReadings.length > 0 && <Link
                to='/my_reads'>
                <button 
                onClick={props.deleteAllSavedStories}
                className="app-title">Delete All</button>
              </Link>}

              <Link to='/home'>
                <button 
                  onClick={props.generateRandomCategory}
                  className="app-title">randomize</button>
              </Link>
            </div>

          </div>

        </div>
      </nav>
    )
}
