import React, { Component } from 'react';
import './App.scss';
import { getTopStories } from '../../apiCalls'
import allNewsCategories from '../../data/data'
import { HomePage } from '../HomePage/HomePage'
import { LaterReads } from '../LaterReads/LaterReads'
import { Switch, Route, Link} from "react-router-dom";

import moment from 'moment'
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
      
        <nav className="nav-bar">
          <div className="day-information">
              <h5 className="app-title">{moment().format('LLL')}</h5>
            </div>
            <div className="title-container">
              <h1 className="app-title">CommuniKaté</h1>
              <h3 className="sub-title">Top stories Only</h3>
            </div>
            <div className="controls-container">
          </div>
        </nav>

        <section className="banner">
          <div className="banner-container">
            <div className="interactive-controls">
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
              className="app-title">
              My reads
              </button>
            </Link>

            <Link to='/home'>
              <button 
                onClick={this.generateRandomCategory}
                className="app-title">
                randomize
                </button>
            </Link>
            </div>
          </div>
        </section>
        <Switch>
            <Route 
            exact
            path='/home'>
              <HomePage 
                newsData={this.state.newsData}
                selectCategory={this.selectCategory}
                currentCategory={this.state.currentCategory}
                saveReading={this.saveReading}
              />
            </Route>

            <Route 
              exact
              path='/my_reads'>
                <LaterReads/>
            </Route>

        </Switch>
      </div>
    )
  }
}

export default App;
