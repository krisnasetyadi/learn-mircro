const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')
const PORT = 4002
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {}

// // example body posts
// {
//     'j123j42':{
//         id:'j123j42',
//         title: 'post title',
//         comment: [
//             {id:'klj3kll', content: 'comment!'}
//         ]
//     }
// }
const handleEvent = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }
    if(type === 'CommentCreated') {
        const { id , content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    if (type === 'CommentUpdated') {
        const { id , content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            console.log('comment.id === id', comment.id === id)
            return comment.id === id
        });
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data)
 
    // console.log('current data structure', posts);
    res.send({});
})

app.listen(PORT, async() => {
    console.log( `Query service is running on port ${PORT}` )
    // make req to event bus

    const res = await axios.get('http://event-bus-srv:4005/events')

    for ( let event of res.data) {
        console.log('processing event: ', event.type)
        handleEvent(event.type, event.data)
    }
})