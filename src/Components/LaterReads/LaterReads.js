import React from 'react';
import './LaterReads.scss';
import moment from 'moment';

export const LaterReads = (props) =>{
    console.log(props)
    const injectUserSaves = () => {
        if(props.laterReadings.length === 0){
            return <h1 className="sorry">Sorry but there are no readings</h1>
        }
        
       return props.laterReadings.map(story => {
           return(
            <article className="story-container">
                <div className="article-title-container">

                <h2 className="article-title">{story.title}</h2>
                </div>
                
                <div className="image-container">
                  {/* <img id='' className="article-img" src={story.multimedia[0].url} alt=''/> */}
                  <img 
                    id={story.created_date} 
                    className="article-img" 
                    src={ story.multimedia ? story.multimedia[0].url :'https://upload.wikimedia.org/wikipedia/en/d/d6/Image_coming_soon.png'} 
                    alt={story.multimedia ? story.multimedia[0].caption : "image not available"}/>
                </div>

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
                <div className="nyt-link-container">
                    <a className="more" href={story.url} >find more</a>
                </div>

                <div
                    className="delete-icon">
                    <i 
                    id={`${story.newsType}#${story.created_date}`}
                    onClick={(event) => props.deleteSavedReading(event)}
                    className="fas fa-times-circle"></i>
                   
                </div>


            </article>
           )
       })
    }
    return (
        <div className="all-read-container">
            <div className="inner-container">
                <h1 className="user-title">Your reads</h1>
                {injectUserSaves()}
            </div>
        </div>
    )
}
