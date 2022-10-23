const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const PORT = 4003
const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        console.log('data', data);
        console.log('status', status);
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status: status,
                content: data.content
            }
        });
    }
    res.send({});
});

app.listen(PORT,() =>{
    console.log(`Moderation listen on port ${PORT}`)
});