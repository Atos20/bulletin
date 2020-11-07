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
      laterReadings:[],
      error: '',
    }
  }

  saveReading = (event) => {
    const id = event.target.id.split('#')
    const allNewsCopy = this.state.newsData
    const savedElement = allNewsCopy[id[0]].results.find(entry => {
      return entry.created_date === id[1]
    });
    this.setState({laterReadings: [...this.state.laterReadings, savedElement]})
  }

  componentDidMount =  async () => {
    await this.requestData()
  }
  
  generateRandomCategory =  () => {
    const randomCategory = this.state.allNewsCategories[Math.floor(Math.random() * allNewsCategories.length)];
    this.displayChosenCategory(randomCategory)
  }

  displayChosenCategory = async (category) => {
    const chosenOne =  await this.state.newsData[category]
    const newData = Object.keys(chosenOne).reduce((data) =>{
      data.section = chosenOne.section
      data.topStories = chosenOne.results
      data.last_updated = chosenOne.last_updated
      data.id = chosenOne.created_date
      data.dataType = category
      return data
    }, {})
    this.setState(prevState => ({
      currentCategory: {...prevState.currentCategory =   newData}
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
          generateRandomCategory={this.generateRandomCategory}
          saveReading={this.saveReading}
        />


      </div>
    )
  }
}

export default App;
