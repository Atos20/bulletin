import React from 'react'
import './HomePage.scss'
import moment from 'moment'
import { FaClock } from "react-icons/fa";

export const HomePage = (props) => {
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
            {/* <img className="cover-imge" src="https://images.unsplash.com/photo-1508612761958-e931d843bdd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80" alt=""/> */}
            <h1 className="welcome">Welcome to Communik</h1>
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
              {/* <h5 className="more">more</h5> */}
              <a className="more" href={story.url} >more</a>
                <i 
                id={`${props.currentCategory.newsType}#${story.created_date}`}
                onClick={(event) => props.saveReading(event)}
                className={!story.saved ? "far fa-bookmark" :"fas fa-bookmark" }></i>
            </div>

            <div className="image-container">
              <img id={story.created_date} className="article-img" src={ story.multimedia ? story.multimedia[0].url :'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'} alt={"image no available"}/>
                {/* <img id='' className="article-img" src={story.multimedia[0].url} alt=''/> */}
            </div>

            <div className="additional-info">
              {/* <p className="info published_date">Published date {moment(story.published_date).format('LLLL')}</p> */}
              <p className="info updated_date">Updated date {moment(story.updated_date).format('LLLL')}</p>
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
