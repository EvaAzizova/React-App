
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users/', require('./routes/users'))


app.listen(3100, () => {
console.log ('Server started on port 3100')
})

