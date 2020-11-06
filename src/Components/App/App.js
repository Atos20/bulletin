import React, { Component } from 'react';
import './App.scss';
import { getTopStories } from '../../apiCalls'
import allNewsCategories from '../../data/data'
import { HomePage } from '../HomePage/HomePage'
import { Route, Router, Switch } from 'react-router-dom';
export class App extends Component {
  constructor(){
    super()
    
    this.state = {
      newsData: {},
      allNewsCategories: allNewsCategories,
      error: ''
    }
  }
  
  componentDidMount = () => {
    this.populateCategories()
  }

  populateCategories = () => {
    allNewsCategories.forEach(category => {
      this.setState(prevState => ({
        newsData: {
          ...prevState.newsData, 
          [category]: {}}
      }))
    })
    this.requestData('sports')
  }

  requestData = async(category) => {
    const promise = await getTopStories(category)
    this.setState(prevState => ({
       newsData: {
         ...prevState.newsData,
        [category]: promise
       }
    }))
  }


  render() {
    return (
      <div className="App">

      {/* <Router
      exact
      path='/home'> */}
        <HomePage />
      {/* </Router> */}

      </div>
    )
  }
}

export default App;
