import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import axios from 'axios'

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    })

    const { HOST, TOKEN } = process.env

    const params = {
        token: TOKEN,
        static: false,
        published: true
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => axios.get(HOST + '/pages', { params })
            .then(e => e.data.data.map(e => ({
                permalink: e.permalink,
                title: e.title,
                description: e.description,                
                category: e.category,
                coverImage: e.coverImage,
                tags: e.tags,
                date: e.date
            })))
            .catch(() => Boom.badRequest('invalid query')),
        options: {
            cache: {
                expiresIn: 3600 * 1000,
                privacy: 'private'
            }
        }
    })


    server.events.on('response', request => {
        console.log(request.info.remoteAddress +
            ': ' +
            request.method.toUpperCase() +
            ' ' +
            request.path +
            ' --> ' +
            request.response.statusCode)
    })

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()