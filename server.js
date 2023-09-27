// import { createServer } from 'node:http'

// const server = createServer((request, response) =>{
//     response.write('oi');

//     return response.end();
// })

// server.listen(3333)

// // POST localhost: 3333/videos
// // DELETE localhjost: 3333/videos/1

import { fastify } from 'fastify'
//import { DatabaseMmeory } from './database-memory.js'
import { databasePostges } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMmeory();

const database = new databasePostges

// GET, POST, PUT, DELETE, PATCH, 

// POST http://localhost:3333/videos

// Route paramater

// request body

server.post('/videos', async (request, reply) =>{
    const {title, description, duration} = request.body

    await  database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos',async (request) =>{
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

    server.put('/videos/:id', async(request, reply) =>{
    const videoID = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoID, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async(request,reply) =>{
    const videoId = request.params.id

    await database.delete(videoId)
    
    return reply.status(204).send()
})

server.listen({
    port: 8080, 
})