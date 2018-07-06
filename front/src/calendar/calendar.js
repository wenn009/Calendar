import React, { Component } from 'react';
import moment from 'moment';
import './calendar.css';
import Form from '../form/form';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: moment(),
            daySelected: null,
            dateContext: moment(),
            showForm: false,
            selectedDate: moment(),
            events: {},
            formData: {
                starttime: "",
                endtime: "",
                description: ""
            }
        }
    }

    weekdays = moment.weekdays();

    year = () => {
        return this.state.dateContext.format("YYYY");
    }
    month = () => {
        return this.state.dateContext.format("MMMM")
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    firstDayOfMonth = () => {
        let date = this.state.dateContext;
        let firstDay = moment(date).startOf('month').format('d');
        return firstDay;
    }
    currentDay = () => {
        return this.state.dateContext.format('d');
    }
    onDayClick = (e, d) => {
        this.setState({ daySelected: d }, () => {
            let selectedDate = moment(this.year() + this.month() + d);
            this.setState({ showForm: true, selectedDate: selectedDate });
            // alert("selected : " + selectedDate.format("YYYY-MM-DD"));
            // prompt("event date", selectedDate.format("YYYY-MM-DD"), "event description", "hello");
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        const date = this.state.selectedDate;
        const starttime = this.state.formData.starttime;
        const endtime = this.state.formData.endtime;
        const description = this.state.formData.description;

        fetch('http://localhost:3000/api/v1/events', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                starttime: starttime,
                endtime: endtime,
                description: description
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonBody) => {
                console.log(jsonBody);
                this.setState({ showForm: false });
                this.getAllEvents();
            })
            .catch((err) => {
                console.log(err);
            })
    }


    handleChange = (event) => {
        const fieldName = event.target.name;
        const formData = this.state.formData;
        formData[fieldName] = event.target.value;
        this.setState({ formData });

    }

    getAllEvents = () => {
        fetch('http://localhost:3000/api/v1/events', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonBody) => {
                console.log(jsonBody);
                this.setState({ events: jsonBody });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    formatEvents = () => {
        const events = this.state.events;
        const formattedEvent = {};
        Object.keys(events).forEach(function (key, index) {
            const date = moment(key);
            const day = date.format('D');
            formattedEvent[day] = [];
            formattedEvent[day].push(events[key]);
        });
        return formattedEvent;
    }

    componentDidMount() {
        this.getAllEvents();
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.showForm !== this.state.showForm && this.state.showForm !== true) {
    //         this.getAllEvents();
    //     }

    // }

    render() {

        let weekdays = this.weekdays.map((day, key) => {
            return <th key={key} className='weekdays'>{day}</th>
        })

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 21} className="empty">{""}</td>)
        }
        const events = this.formatEvents();
        console.log(events);

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d === this.currentDay() ? "day current-day" : "day");
            let selectedClass = (d === this.state.daySelected ? "selected-day" : "")
            // Object.keys(events).forEach(function (key, index) {
                if (events.hasOwnProperty(d)) {
                    daysInMonth.push(
                        <td key={d * 12} className={className + selectedClass}>
                            <span onClick={(e) => { this.onDayClick(e, d) }}> {d} </span>
                            <span>event</span>
                        </td>
                    )
                } else {
                    daysInMonth.push(
                        <td key={d * 12} className={className + selectedClass}>
                            <span onClick={(e) => { this.onDayClick(e, d) }}> {d} </span>
                        </td>
                    )
                }

            // });

        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i * 200}>
                    {d}
                </tr>
            );
        })

        return (
            <div>
                <h4>
                    <span>{this.year()}</span>
                    <span>{this.month()}</span>
                </h4>
                <table>
                    <thead>
                        <tr>
                            {weekdays}
                        </tr>
                    </thead>
                    <tbody>
                        {trElems}
                    </tbody>
                </table>
                {this.state.showForm ?
                    <Form date={this.state.selectedDate}
                        handleChange={this.handleChange}
                        onSubmit={this.onSubmit} /> :
                    <div></div>
                }

            </div>
        );
    }
}

export default Calendar;
