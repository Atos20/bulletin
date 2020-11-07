import React, { Component } from 'react';
import './App.scss';
import { getTopStories } from '../../apiCalls'
import allNewsCategories from '../../data/data'
import { HomePage } from '../HomePage/HomePage'
// import { Route, Router, Switch } from 'react-router-dom';
export class App extends Component {
  constructor(){
    super()
    
    this.state = {
      newsData: {},
      allNewsCategories: allNewsCategories,
      selectedCategories: [],
      currentCategory: {},
      error: '',
    }
  }

  componentDidMount =  async () => {
    await this.requestData()
    await this.generateRandomCategory()
  }
  
  generateRandomCategory = async () => {
    const randomCategory = this.state.allNewsCategories[Math.floor(Math.random() * allNewsCategories.length)];
    console.log(this.state.newsData)
  }

  displayChosenCategory = async (category = 'arts') => {
    const chosenOne =  await this.state.newsData[category]
    console.log(chosenOne)
    const newData = Object.keys(chosenOne).reduce((data) =>{
      data.section = chosenOne.section
      data.topStories = chosenOne.results
      data.last_updated = chosenOne.last_updated
      return data
    }, {})
    console.log(newData)
    this.setState(prevState => ({
      currentCategory: {...prevState.currentCategory =  newData}
    }))
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

  selectCategory = (event) => {
    console.log(event)
    const category = event.target.id
    if (!this.state.selectedCategories.includes(category)){
      this.setState({selectedCategories: [...this.state.selectedCategories, category]});
    }
    this.displayChosenCategory(category)
  }

  render() {

    return (
      <div className="App">


        <HomePage 
          newsData={this.state.newsData}
          selectCategory={this.selectCategory}
          currentCategory={this.state.currentCategory}
        />


      </div>
    )
  }
}

export default App;
