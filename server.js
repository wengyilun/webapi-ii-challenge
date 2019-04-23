const express = require('express')
const postRouter = require('./router/postRouter')
const cors = require('cors')
const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
	console.log('req')
	res.send('<h1>Hello World</h1>')
})

module.exports = server
