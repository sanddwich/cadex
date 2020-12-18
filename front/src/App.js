import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 1,
      length: 2,
    }
  }

  getApi = async () => {
    const res = await fetch('http://localhost:3001/api', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    })

    if(res.ok) {
      console.log(await res.json())
    } else {
      console.log('API ERROR')
    }
  }

  render() {
    return (
      <Container fluid className="p-0 App">
        <Row className="m-0 p-0">
          <Col sm={3} className="m-0 p-0">
            <div className="App__formContainer">
              <div className="App__input">
                <input type="number" name="wigth" placeholder="|Ширина"></input>
              </div>
              <div className="App__input">
                <input type="number" name="length" placeholder="|Длина"></input>
              </div>
              <div className="App__input">
                <input type="number" name="height" placeholder="|Высота"></input>
              </div>
              <div className="App__button">
                <button onClick={() => this.getApi()}>Смоделировать</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  
}

export default App;
