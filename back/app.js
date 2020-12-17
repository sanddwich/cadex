const CONFIG = require('./config')
const express = require('express')


const app = express();

const serverUrl = CONFIG.server.url + ':' + CONFIG.server.port.toString()

//  Functions ===============================================


//  ROUTES =====================================

//  Main route
app.get('/api', (req, res) => {
  console.log('GET Request')
  res.send(JSON.stringify({message: 'hello'}))
})

//  SERVER listen
app.listen(CONFIG.server.port, () => {
  console.log('APP listen port: ' + CONFIG.server.port)
})