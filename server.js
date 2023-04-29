//This is the package for calling express and handling errors
const express = require('express')
//The package required  for calling body Parser
const bodyParser = require('body-parser');
//This package is also used for express
const app = express()
//This port runs locally and is used when hosting
const port= process.env.PORT || 2000 
//Required package for the Database
const db = require('./db')
//Package for the routes
const employeeroutes = require('./routes/employee-routes')



require('dotenv').config()

// Use middleware
app.use(express.json());
app.use(bodyParser.json())
//Middleware
app.use('/api/employees', employeeroutes)

// //Error Handler
// app.use((err, req,res,next)=>{
//   console.log(err)
//   res.status(err.status || 500).send('Something went wrong')
// })

//first make sure db connection is successful
//then start the express server
db.query("SELECT 1")
.then(() => {
  console.log('db connection succeeded')
  app.listen(port, ()=> console.log(`listening to port ${port}`))
})
.catch(err => console.log('db connection failed. \n' + err))

