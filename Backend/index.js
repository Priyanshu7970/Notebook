const express = require('express')
const app = express()
const port = 5000 
var cors = require('cors')
const connectToMongo = require('./db') 
connectToMongo();

app.use(cors())
app.use(express.json())
// Available routes 
//  agar mai localhost:5000/api auth karta hu to mujhe routes/auth.js file hai uska response or request dekhneko milega
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes')) 
app.get('/',(req,res)=>{
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Inotebook app listening on port ${port}`)
})
