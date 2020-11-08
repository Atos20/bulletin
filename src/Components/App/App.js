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
      searchedItems: {
        query:'',
        category:'',
        results:[],
        searchHistory:[]
      },
    }
  }

  componentDidMount =  async () => {
    await this.requestData()
    this.retriveFromLocalStorage()
  }
  
  retriveFromLocalStorage = () => {
    const data = localStorage.getItem('laterReadings')
    
    this.setState({laterReadings: JSON.parse(data)})
  }

  saveToLocalStorage = () => {
    const copyOfLaterReadings = [...this.state.laterReadings]
    const save = localStorage.setItem('laterReadings',JSON.stringify(copyOfLaterReadings))
  }

  updateHomePage =  (news) => {
    return news.reduce((data, story) =>{
      data.section= story.section
      data.topStories.push(story)
      data.last_updated= story.updated_date
      data.id= Date.now()
      data.newsType= 'Your Search'
    return data 
    },{topStories: []})
  }

  findUserStory = () => {
    const { category, query } = this.state.searchedItems
    if (!query && !category) {
      return this.setState({error: 'please choose a criteria'})
      
    }
    if (!category){
      return this.setState({error: 'you must select a category'})
      
    } 
    if (!query) {
      return this.setState({error: 'what do you want to look for?'})
      
    }
    const stories = this.state.newsData[category].results.filter(story => {
      return story.title.toLowerCase().includes(query)
    })
    if (stories.length === 0 ) {
      return this.setState({error: 'no items found'})
      
    }
    const newsFound = this.updateHomePage(stories)
    
    this.setState(state => ({
      currentCategory: newsFound,
      searchedItems: {...state.searchedItems,
        results:  stories,
        searchHistory: [...state.searchedItems.searchHistory, stories ]
      }
    }))
  }

  updateSearchCategory = (event) => {
    this.setState(state => ({
      searchedItems: {...state.searchedItems,
          category: event.target.value
      }
    }))
  }

  updateSearchQuery = (event) => {
    this.setState(prevState => ({
      searchedItems: {...prevState.searchedItems,
          query: event.target.value
      }
    }))
  }

  injectOptionsCategories = () =>{
    return this.state.allNewsCategories.map((category,i) => {
      return(<option 
        key={i}
        value={category}
        id={category}
        name={category}>
        {category}</option>)
    })
  }

  deleteAllSavedStories = () => {
    this.setState({ laterReadings: []})
  }
  
  deleteSavedReading = (event) =>{
    const id = event.target.id.split('#')
    const copyOfSavedStories = [...this.state.laterReadings]
    const itemToDelete = copyOfSavedStories.find(story => {
      return story.newsType === id[0]
    })
    itemToDelete.saved = !itemToDelete.saved
    const index = copyOfSavedStories.indexOf(itemToDelete)
    if(index !== -1){
      copyOfSavedStories.splice(index, 1)
      this.setState({ laterReadings: copyOfSavedStories})
    }
    this.saveToLocalStorage()
  } 
  
  saveReading = (event) => {
    const id = event.target.id.split('#')
    const allNewsCopy = this.state.newsData
    const savedElement = allNewsCopy[id[0]].results.find(entry => {
      return entry.created_date === id[1]
    });
    savedElement.newsType = id[0]
    savedElement.saved = !savedElement.saved
    if (!this.state.laterReadings.includes(savedElement)) {
      this.setState({laterReadings: [...this.state.laterReadings, savedElement]})
    }
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
      data.id = Date.now()
      data.newsType = category
      data.topStories.forEach(story =>story.saved= false)
      return data
    }, {})
    this.setState(prevState => ({
      currentCategory: {...prevState.currentCategory = newData}
    }))
  }

  requestData = async() => {
    try{
      await allNewsCategories.forEach(category =>{
         getTopStories(category)
        .then(data =>  this.setState(prevState => ({
          newsData: {
             ...prevState.newsData,
            [category]: data
          }
        })))
      })
    } catch(error){
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
              <h1 className="app-title">CommuniK</h1>
              <h3 className="sub-title">Top stories Only</h3>
            </div>
            <div className="control-container">
          </div>
        </nav>

        <section className="banner">
          <div className="banner-container">
          <div className="search-container">
                <div className="inner-search-container">
                  <select 
                    value={this.state.searchedItems.category}
                    onChange={(event) => {this.updateSearchCategory(event)}}>
                    <option 
                      placeholder='category'
                      value=''>categories</option>
                      {this.injectOptionsCategories()}
                  </select>
                  <input 
                    value= {this.state.searchedItems.query}
                    onChange={this.updateSearchQuery}
                    placeholder='search'
                    name='searchedItem'
                    type="text" 
                    className="search-bar"/>
                    <i className="fas fa-search"
                      onClick={this.findUserStory}
                    ></i>
                </div>
                {this.state.error && <p className="error-message">{this.state.error}</p>}
            </div>
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
                onClick={this.saveToLocalStorage}
                className="app-title">My reads</button>
              </Link>

              {this.state.laterReadings.length > 0 && <Link
                to='/my_reads'>
                <button 
                onClick={this.deleteAllSavedStories}
                className="app-title">Delete All</button>
              </Link>}

              <Link to='/home'>
                <button 
                  onClick={this.generateRandomCategory}
                  className="app-title">randomize</button>
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
                <LaterReads
                  laterReadings={this.state.laterReadings}
                  deleteSavedReading={this.deleteSavedReading}
                />
            </Route>
            
            <Route
              path='/*'>
              <div className="error-contianer">
                <h1 className="error">Oops, something went wrong</h1>
              </div>
            </Route>
        </Switch>
      </div>
    )
  }
}

export default App;
