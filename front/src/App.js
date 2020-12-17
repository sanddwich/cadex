import React from 'react';
import './App.css';

class App extends React.Component {
  getApi = async () => {
    const res = await fetch('http://localhost:3001/api', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin:": "*",
      }
    })


    if(res.ok) {
      console.log(await res.text())
    } else {
      console.log('API ERROR')
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Triangle</h1>
        <button onClick={() => this.getApi()}>GetApi</button>
      </div>
    );
  }
  
}

export default App;
