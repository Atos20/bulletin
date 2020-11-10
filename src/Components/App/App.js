import React, { Component } from 'react';
import './App.scss';
import { getTopStories } from '../../apiCalls';
import allNewsCategories from '../../data/data';
import { HomePage } from '../HomePage/HomePage';
import { LaterReads } from '../LaterReads/LaterReads';
import { Switch, Route } from "react-router-dom";
import { NavBar } from '../NavBar/NavBar';
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
      }
    }
  }

  searchForStoriesByDate = async(date) => {
    if(typeof date !== 'string' || date.length !== 10){
      return 
    }
    if (date.includes('/')) {
      date = date.split('/').join('-')
    }
    await {...this.state.newsData}
      const matchingStories = allNewsCategories.reduce((acc, curr) => {
         this.state.newsData[curr].results.forEach(story => {
          if (date === moment(story.created_date).format('MM-DD-YYYY')) {
            acc.results.push(story)
          }
        })
        return acc
      }, {results: []})
      
      if (matchingStories.results.length === 0) {
        return console.log('no matching stories')
      }
      const newsFound = this.updateHomePage(matchingStories.results)
      this.setState({currentCategory: newsFound});
  }

  componentDidMount =  async () => {
    await this.requestData()
    this.retriveFromLocalStorage()
  }
  
  retriveFromLocalStorage = () => {
    const data = localStorage.getItem('laterReadings')
    
    this.setState({laterReadings: JSON.parse(data) || []})
  }

  saveToLocalStorage = () => {
    const copyOfLaterReadings = [...this.state.laterReadings]
    localStorage.setItem('laterReadings',JSON.stringify(copyOfLaterReadings))
  }

  updateHomePage =  (news) => {
    const data = news.reduce((data, story) =>{
      data.section= story.section
      data.topStories.push(story)
      data.last_updated= story.updated_date   
      data.newsType= story.section.toLowerCase()
      data.topStories.forEach(story =>story.saved= false)
      return data
    },{topStories: []})
    return data
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
      error:'',
      currentCategory: newsFound,
      searchedItems: {...state.searchedItems,
        query:'',
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
        id={category}>
        {category}</option>)
    })
  }

  deleteAllSavedStories = () => {
    this.setState({ laterReadings: []})
    localStorage.removeItem('laterReadings');
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
    setTimeout(() => {
      this.saveToLocalStorage()
    }, 100);
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
      data.newsType = category
      data.topStories.forEach(story => story.saved= false)
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
      
        <div className="app-title-container">
          <div className="title-container">
            <h1 className="app-title">CommuniK</h1>
            <h3 className="sub-title">Headlines</h3>
          </div>
        </div>

        <NavBar 
          updateSearchCategory={this.updateSearchCategory}
          searchedItems={this.state.searchedItems}
          injectOptionsCategories={this.injectOptionsCategories}
          updateSearchQuery={this.updateSearchQuery}
          laterReadings={this.state.laterReadings}
          findUserStory={this.findUserStory}
          error={this.state.error }
          saveToLocalStorage={this.saveToLocalStorage}
          deleteAllSavedStories={this.deleteAllSavedStories}
          generateRandomCategory={this.generateRandomCategory}
          userDate={this.state.userDate}
          searchForStoriesByDate={this.searchForStoriesByDate}
          query={this.state.searchedItems.query}
        />

        <Switch>
            <Route 
            exact
            path='/'>
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
                  saveReading={this.saveReading}
                />
            </Route>
            
            <Route 
            exact
            path='/category/:category/top_stories'
            render={({ match }) => {
              return <HomePage 
                name={match.params}
                newsData={this.state.newsData}
                selectCategory={this.selectCategory}
                currentCategory={this.state.currentCategory}
                saveReading={this.saveReading}
              />
            }}>
            </Route>

           <Route
              path='/*'>
              <div className="error-contianer">
                 <h1 className="error">'Oops, something went wrong'</h1>
              </div>
            </Route>
        </Switch>
      </div>
    )
  }
}

export default App;
