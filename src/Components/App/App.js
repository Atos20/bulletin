import React, { Component } from 'react';
import './App.scss';
import { getTopStories } from '../../apiCalls'
import allNewsCategories from '../../data/data'

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
    allNewsCategories.forEach(category => {
      this.setState(prevState => ({
        newsData: {...prevState.newsData, [category]: 'something'}
      }))
    })
  }

  


  render() {
    
    return (
      <div className="App">
        <h1 className="hola">hola</h1>
      </div>
    )
  }
}

export default App;
