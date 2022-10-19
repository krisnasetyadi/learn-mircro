const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const PORT = 4005
const app = express()

app.use(bodyParser.json())
const events = []

app.post('/events', (req, res) => {
    const event = req.body
    // every incoming event / receive event throw to events array
    events.push(event)
    // posts
    axios.post('http://localhost:4000/events', event).catch((err) => console.log(err.message))
    // comment
    axios.post('http://localhost:4001/events', event).catch((err) => console.log(err.message))
    // querry
    axios.post('http://localhost:4002/events', event).catch((err) => console.log(err.message))
    // moderation
    axios.post('http://localhost:4003/events', event).catch((err) => console.log(err.message))
    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(PORT, () => {
    console.log(`Event-bus running on port ${PORT}`)
})