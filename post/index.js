const express = require('express')
const  bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const app = express()

// app.use(express.json())

app.use(bodyParser.json())

const posts = {}

console.log('posts', posts)

app.get('/posts', (req,res) => {
    res.send(posts)
})

app.post('/posts', (req,res) => {
    const id = randomBytes(4).toString('hex')
    console.log('id', id)
    const { title } = req.body
    console.log('title', title)
    posts[id] = {
        id, title
    }
    res.status(201).send(posts[id])
})

app.listen(4000, ()=>{
    console.log('listening on 4000')
})