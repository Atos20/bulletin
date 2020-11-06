import React from 'react'
import './HomePage.scss'
import moment from 'moment'


export const HomePage = (props) => {

    const tags = Object.keys(props.newsData).map((tag, i) => {
        return (
          <div 
            id={tag}
            key={i}
            className="category">
              <h3 
                id={tag}
                className="category-name">
                {tag}
              </h3>
          </div>
        )
    })

    

    return (
        <body className="homepage">
          <nav className="nav-bar">
            
            <div className="day-information">
                <h5 className="app-title">{moment().format('LLL')}</h5>
            </div>

            <div className="title-container">
                <h1 className="app-title">CommuniKaté</h1>
                <h3 className="sub-title">Top stories Only</h3>
            </div>

            <div className="controls-container">
                <button className="app-title">log-in</button>
                <button className="app-title">log-in</button>
            </div>
          </nav>

          <section className="banner">
            <div className="banner-container">
                
            </div>
          </section>

          <section className="categories-container">
            <div className="categories">
            {tags}
            </div>

            <div className="some-news-container">

            </div>

          </section>
        </body>
    )
}
