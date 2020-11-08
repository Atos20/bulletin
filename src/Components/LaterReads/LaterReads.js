import React from 'react';
import './LaterReads.scss';
import moment from 'moment';
import { News } from '../News/News'

export const LaterReads = (props) =>{
    
    return (
        <div className="all-read-container">
            <News 
                laterReadings={props.laterReadings}
                deleteSavedReading={props.deleteSavedReading}
            />
        </div>
    )
}
