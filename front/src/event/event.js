import React, { Component } from 'react';
import './event.css';

class Event extends Component {
    render() {
        return (
            <div >
                {console.log(this.props.events)}
                {this.props.events.map((e, key) => {
                    return e.map((event, key) => {
                        return (
                            <div key={key}>
                                <h3> {event.date} </h3>
                                <p> {event.starttime} - {event.endtime}</p>
                                <p> {event.description} </p>
                                <br />
                            </div>)
                    })
                    
                })}
            </div>

        );
    }
}

export default Event;