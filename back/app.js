const CONFIG = require("./config");
var cors = require("cors");
const three = require("three");

const express = require("express");
const app = express();
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

const serverUrl = CONFIG.server.url + ":" + CONFIG.server.port.toString();

const defaultCubeParams = {
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};

//  Functions ===============================================

const cubeCalc = (params) => {
  const inputCubeParams = {
    ...defaultCubeParams,
    ...params
  }
  
  const geometry = new three.BoxGeometry(inputCubeParams)
  const material = new three.MeshBasicMaterial({color: '#2283B9'})
  const cube = new three.Mesh(geometry, material)

  // console.log(cube)

  // return { geometry: {...geometry}, material: {...material} }
  return inputCubeParams
};

//  ROUTES =====================================

//  Main route
app.post("/api", (req, res) => {
  console.log("POST CubeRequest");
  // console.log(req.body)
  res.send(JSON.stringify(cubeCalc(req.body)))
});

//  SERVER listen
app.listen(CONFIG.server.port, () => {
  console.log("APP listen port: " + serverUrl);
});
