import React from 'react'
import './HomePage.scss'
import moment from 'moment'


export const HomePage = () => {
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

          <section className="categories">

          </section>
        </body>
    )
}
