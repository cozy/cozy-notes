import Service from '../../lib/collab/service.js'
import startCollabServer from '../../lib/collab/server.js'

const port = 3000

console.log(`Collab server started on port ${port}`)

const service = new Service()

startCollabServer(service, port)
