const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const PORT = 4001
const app = express()
app.use(bodyParser.json())
app.use(cors())
const commentsByPostId = {}

app.get('/posts/:id/comments', (req,res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' })
    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type:'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(201).send(comments)
})

// handle incoming events
app.post('/events', async (req, res) => {
    console.log('Comment Event Received:', req.body.type);

    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => {
         return comment.id === id 
        })
        comment.status = status

        // put this together and send it over to event bus
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id: id,
                status: status,
                postId: postId,
                content: content
            }
        });
    }
    res.send({});
})

app.listen(PORT,() =>{  
    console.log(`Comment service is run on PORT ${PORT}`)
})