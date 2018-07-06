import React, { Component } from 'react';
import './form.css';

class Form extends Component {
    render() {
        return (
            <div >
                <h4>Add an event to {this.props.date.format("YYYY-MM-DD")}</h4>
                <form>
                    Start Time<br />
                    <input type="time" name="starttime" placeholder="11:00" onChange={this.props.handleChange} />
                    <br />
                    End Time:<br />
                    <input type="time" name="endtime" placeholder="12:00" onChange={this.props.handleChange} />
                    <br />
                    Description:<br />
                    <textarea type="text" name="description" onChange={this.props.handleChange} />
                    <input type="submit" value="Submit" onClick={this.props.onSubmit}></input>
                    <br />
                </form>
            </div>

        );
    }
}

export default Form;