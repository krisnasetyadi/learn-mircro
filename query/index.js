const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    
    if(type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }
    if( type === 'CommentCreated') {
        const { id , content, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    }
    console.log('current data structure', posts);
    res.send({});
})

app.listen(PORT, () => {
    console.log( `Query service is running on port ${PORT}` )
})