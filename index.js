const express = require('express')
require('dotenv').config()
const { connectDatabase } = require('./database/confi')
const cors = require ('cors')



const app = express()
app.use(cors())
connectDatabase()
app.use(express.json())


app.use('/api/' , require('./routers/course')) 
app.use('/api/' , require('./routers/user'))
app.use('/api/' , require('./routers/userBlog'))
app.use('/api/' , require('./routers/blog'))
app.use('/api/' , require('./routers/newLetters'))

app.listen(process.env.PORT ,() => {
    console.log(process.env.PORT);
})