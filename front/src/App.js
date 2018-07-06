import React, { Component } from 'react';
import './App.css';
import Calendar from './calendar/calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">My Calendar</h1>
        </header>

        <Calendar />

      </div>
    );
  }
}

export default App;
