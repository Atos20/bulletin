import React from 'react'
import './HomePage.scss'
import moment from 'moment'
import { FaClock } from "react-icons/fa";

export const HomePage = (props) => {
  // console.log(props)
    const tags = Object.keys(props.newsData).map((tag, i) => {
        return (
          <div 
            id={tag}
            key={i}
            onClick={props.selectCategory}
            className="category">
              <h3 
                id={tag}
                onClick={props.selectCategory}
                className="category-name">
                {tag}
              </h3>
          </div>
        )
    })

    const handleCurrentCategory = () => {
      if (!props.currentCategory.topStories) {
        return (
          
          <article className="article-container">
            <img className="cover-imge" src="https://images.unsplash.com/photo-1508612761958-e931d843bdd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80" alt=""/>
          </article>
        )
      }
      return props.currentCategory.topStories.map((story, i) => {
        return (
          <article 
            key={i}
            className="article-container">
            
            <h2 className="article-title">{story.title}</h2>
           
              <div
                className="add-icon">
                  <i 
                  id={`${props.currentCategory.dataType}#${story.created_date}`}
                  onClick={(event) => props.saveReading(event)}
                  className="far fa-bookmark"></i>
                </div>
    
       

            <img id={story.created_date} className="article-img" src={story.multimedia[0].url} alt={story.multimedia[0].caption}/>
            <div className="additional-info">
              <p className="info published_date">Published date {moment(story.published_date).format('LLLL')}</p>
              <p className="info updated_date">Updated date {moment(story.updated_date).format('LLLL')}</p>
            </div>
            <div className="abstract-container">
              <p className="abstract-content">{story.abstract}</p>
            </div>
            <div className="by-line-container">
              <p className="by-line-content">{story.byline}</p>
            </div>
          </article>
        )
      })

    }

    return (
        <section className="homepage">
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
                <button
                  
                  className="app-title">vie for later</button>
                <button 
                  onClick={props.generateRandomCategory}
                  className="app-title">randomize</button>
                </div>
            </div>
          </section>

          <section className="categories-container">
            <div className="categories">
            {tags}
            </div>

             <div className="some-news-container">
            <h1 className="news-section">{props.currentCategory.section}</h1>
               {handleCurrentCategory()}
            </div>

          </section>
        </section>
    )
}


/*
{
    "status": "OK",
    "copyright": "Copyright (c) 2020 The New York Times Company. All Rights Reserved.",
    "section": "U.S. News",
    "last_updated": "2020-11-05T20:38:15-05:00",
    "num_results": 25,
    "results": [
        {
            "section": "us",
            "subsection": "",
            "title": "In a Year of Protest Cries, Now It’s ‘Count Every Vote!’ and ‘Stop the Steal!’",
            "abstract": "Demonstrations have broken out all year long across America, and they have not let up as states tally ballots after Election Day.",
            "url": "https://www.nytimes.com/2020/11/05/us/election-protests-vote-count.html",
            "uri": "nyt://article/2380a63e-d24c-59c8-9413-a17171e45dc7",
            "byline": "By Simon Romero, Shaila Dewan and Giulia McDonnell Nieto del Rio",
            "item_type": "Article",
            "updated_date": "2020-11-06T10:40:24-05:00",
            "created_date": "2020-11-05T18:56:05-05:00",
            "published_date": "2020-11-05T18:56:05-05:00",
            "material_type_facet": "",
            "kicker": "",
            "des_facet": [
                "Presidential Election of 2020",
                "Demonstrations, Protests and Riots"
            ],
            "org_facet": [],
            "per_facet": [
                "Biden, Joseph R Jr",
                "Trump, Donald J"
            ],
            "geo_facet": [],
            "multimedia": [
                {
                    "url": "https://static01.nyt.com/images/2020/11/06/us/05votingprotests-1/merlin_179627493_327ec860-a692-42d8-a947-40ebbbe6223f-superJumbo.jpg",
                    "format": "superJumbo",
                    "height": 1365,
                    "width": 2048,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A &ldquo;Stop the Steal&rdquo; rally at the Pennsylvania State Capitol was one of the nationwide demonstrations on Thursday contesting the process of determining the next president.",
                    "copyright": "Gabriela Bhaskar for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2020/11/06/us/05votingprotests-1/merlin_179627493_327ec860-a692-42d8-a947-40ebbbe6223f-thumbStandard.jpg",
                    "format": "Standard Thumbnail",
                    "height": 75,
                    "width": 75,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A &ldquo;Stop the Steal&rdquo; rally at the Pennsylvania State Capitol was one of the nationwide demonstrations on Thursday contesting the process of determining the next president.",
                    "copyright": "Gabriela Bhaskar for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2020/11/06/us/05votingprotests-1/merlin_179627493_327ec860-a692-42d8-a947-40ebbbe6223f-thumbLarge.jpg",
                    "format": "thumbLarge",
                    "height": 150,
                    "width": 150,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A &ldquo;Stop the Steal&rdquo; rally at the Pennsylvania State Capitol was one of the nationwide demonstrations on Thursday contesting the process of determining the next president.",
                    "copyright": "Gabriela Bhaskar for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2020/11/06/us/05votingprotests-1/merlin_179627493_327ec860-a692-42d8-a947-40ebbbe6223f-mediumThreeByTwo210.jpg",
                    "format": "mediumThreeByTwo210",
                    "height": 140,
                    "width": 210,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A &ldquo;Stop the Steal&rdquo; rally at the Pennsylvania State Capitol was one of the nationwide demonstrations on Thursday contesting the process of determining the next president.",
                    "copyright": "Gabriela Bhaskar for The New York Times"
                },
                {
                    "url": "https://static01.nyt.com/images/2020/11/06/us/05votingprotests-1/merlin_179627493_327ec860-a692-42d8-a947-40ebbbe6223f-articleInline.jpg",
                    "format": "Normal",
                    "height": 127,
                    "width": 190,
                    "type": "image",
                    "subtype": "photo",
                    "caption": "A &ldquo;Stop the Steal&rdquo; rally at the Pennsylvania State Capitol was one of the nationwide demonstrations on Thursday contesting the process of determining the next president.",
                    "copyright": "Gabriela Bhaskar for The New York Times"
                }
            ],
            "short_url": "https://nyti.ms/34ZwjaY"
        },
*/