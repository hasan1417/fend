  // Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=> {
  console.log(`localhost running on port:${port}`)
})

app.get('/all' , (req,res)=> {
  res.send(projectData)
})

app.post('/add', (req,res)=>{
  const allData = {
    temp: req.body.temp,
    date: req.body.date,
    userEntry: req.body.userEntry
  }
  projectData.push(allData);
})