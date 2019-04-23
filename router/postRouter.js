const express = require('express')
const db = require('../data/db')
router = express.Router()

router.get('/', async (req, res) => {
	try {
		const q = req.query
		const offset = q.offset
		const postPerPage = q.limit
		const posts = await db.find()
			.offset(offset)
			.limit(postPerPage)
		res.status(200).json(posts)
	}catch(error){
		res.status(500 ).json({ error: "The posts information could not be retrieved." })
	}
})

router.get('/:id', async (req, res) => {
	const postId = req.params.id
	console.log('postId',postId)
	try {
		const post = await db.findById(postId)
		console.log('postId',postId)
		
		if(post){
			res.status(200).json(post)
		}else{
			res.status(404 ).json({ message: "The post with the specified ID does not exist." })
		}
		
	}catch(error){
		res.status(500).json({ error: "The post information could not be retrieved." })
	}
})

router.delete('/:id', async (req, res) => {
	const postId = req.params.id
	console.log('postId',postId)
	try {
		const post = await db.remove(postId)
		console.log('postId',postId)
		if(post){
			res.status(200).json(post)
		}else{
			res.status(404 ).json({ message: "The post with the specified ID does not exist." })
		}
		
	}catch(error){
		res.status(500).json({ error: "The post could not be removed" })
	}
})

router.post('/', async (req, res) => {
	const postBody = req.body
	console.log('postBody',postBody)
	if(!postBody.title || !postBody.contents){
		res.status(400).json( { errorMessage: "Please provide title and contents for the post." })
	}
	try {
		const postId = await db.insert(postBody)
		res.status(201).json(postId)
		
	}catch(error){
		res.status(500).json({ error: "The post could not be removed" })
	}
})

router.put('/:id', (req, res) => {
	const postId = req.params.id
	const postBody = req.body

	if(!postBody.title || !postBody.contents){
		res.status(400).json( { errorMessage: "Please provide title and contents for the post." })
	}

	db.update(postId, postBody)
	.then((post) => {
		console.log('post', post)
		if(post > 0){
			res.status(200).json( post)
		}else{
			res.status(404).json( { message: "The user with the specified ID does not exist." })
		}
	})
	.catch((err) => {
		res.status(500).json({ error: "The user information could not be modified." })
	})
})

//
// router.put('/:id', async (req, res) => {
// 	const postBody = req.body
// 	const postId = req.params.id
// 	console.log('postId',postId)
// 	console.log('postBody',postBody)
// 	try {
// 		if(!postBody.title || !postBody.contents){
// 			res.status(400).json( { errorMessage: "Please provide title and contents for the post." })
// 		}
// 		const postId = await db.update(postId, postBody)
// 		if(postId){
// 			res.status(200).json(postId)
// 		}else{
// 			res.status(404).json({ message: "The post with the specified ID does not exist." })
// 		}
//
// 	}catch(error){
// 		res.status(500).json({ error: "The post information could not be modified." })
// 	}
// })

module.exports = router
