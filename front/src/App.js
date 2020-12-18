import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './App.scss'

//three library
import * as THREE from 'three'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 1,
      height: 1,
      depth: 1,
      key: 0,
    }
  }

  componentDidMount() {
    // this.buildCube()
  }

  getApi = async () => {
    const outputData = {
      width: this.state.width < 1 ? 1 : this.state.width,
      height: this.state.height < 1 ? 1 : this.state.height,
      depth: this.state.depth < 1 ? 1 : this.state.depth,
    }

    const res = await fetch('http://localhost:3001/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(outputData),
    })

    if (res.ok) {
      // const cube = await res.json()
      // console.log(cube)
      this.buildCube(await res.json())
    } else {
      console.log('API ERROR')
    }
  }

  buildCube = (incomeCube) => {
    this.setState({ key: Math.random() })

    const sceneElement = document.getElementById('canvas')

    // === THREE PARAMS AND RENDER ===
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setClearColor(0x000000, 0) // the second parameter is opacity
    renderer.setSize(sceneElement.offsetWidth, sceneElement.offsetHeight)
    sceneElement.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(2, 1, 1, 1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#1675d1' })
    const cube = new THREE.Mesh(geometry, material)

    // const geometry = new THREE.BoxGeometry( incomeCube.geometry );
    // const material = new THREE.MeshBasicMaterial( {...incomeCube.material, color: '#1675d1' } );
    // const cube = new THREE.Mesh( geometry, material );

    console.log(cube)

    scene.add(cube)
    camera.position.z = 5
    // renderer.render(scene, camera)

    const animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }

  render() {
    return (
      <Container fluid className="p-0 App">
        <Row className="m-0 p-0 App__row">
          <Col sm={3} className="m-0 p-0 d-flex align-items-center justify-content-center">
            <div className="App__formContainer text-center">
              <div className="App__input">
                <input
                  type="number"
                  name="wigth"
                  placeholder="|Ширина"
                  onInput={(event) => this.setState({ width: parseInt(event.target.value) })}
                ></input>
              </div>
              <div className="App__input">
                <input
                  type="number"
                  name="depth"
                  placeholder="|Длина"
                  onInput={(event) => this.setState({ depth: parseInt(event.target.value) })}
                ></input>
              </div>
              <div className="App__input">
                <input
                  type="number"
                  name="height"
                  placeholder="|Высота"
                  onInput={(event) => this.setState({ height: parseInt(event.target.value) })}
                ></input>
              </div>
              <div className="App__button">
                <button onClick={() => this.getApi()}>Смоделировать</button>
              </div>
            </div>
          </Col>
          <Col sm={9} className="m-0 p-0 App__Cube d-flex align-items-center justify-content-center">
            <div id="canvas" key={this.state.key}></div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
