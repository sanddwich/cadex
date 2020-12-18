const CONFIG = require("./config");
var cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const serverUrl = CONFIG.server.url + ":" + CONFIG.server.port.toString();

//  Functions ===============================================

//  ROUTES =====================================

//  Main route
app.post("/api", (req, res) => {
  console.log('POST query');
  res.send(JSON.stringify(req.body));
});

//  SERVER listen
app.listen(CONFIG.server.port, () => {
  console.log("APP listen port: " + CONFIG.server.port);
});
