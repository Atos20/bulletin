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
  
  // componentDidMount = () => {
  //   this.populateCategories()
  //   this.requestData()
  // }

  populateCategories = () => {
    allNewsCategories.forEach(category => {
      this.setState(prevState => ({
        newsData: {
          ...prevState.newsData, 
          [category]: {}
        }
      }))
    })
    
  }

  requestData = async() => {
    try{
      await allNewsCategories.forEach(category =>{
        const promise = getTopStories(category)
        .then(data =>  this.setState(prevState => ({
          newsData: {
             ...prevState.newsData,
            [category]: data
          }
        })))
      })
    } catch(error){
      console.log(error)
      this.setState({error})
    }
  }

  render() {

    return (
      <div className="App">

      {/* <Router
      exact
      path='/home'> */}
        <HomePage 
          newsData={this.state.newsData}
        />
      {/* </Router> */}

      </div>
    )
  }
}

export default App;
