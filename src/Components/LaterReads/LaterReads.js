import React from 'react';
import './LaterReads.scss';
import moment from 'moment';
import { News } from '../News/News'
import PropTypes from 'prop-types';


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

LaterReads.propTypes = {
    laterReadings: PropTypes.array.isRequired,
    deleteSavedReading: PropTypes.func.isRequired,
    saveReading: PropTypes.func.isRequired
}
