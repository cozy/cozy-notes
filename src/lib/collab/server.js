import createSocketIo from 'socket.io'

function startCollabServer(service, port = 3000) {

  var io = createSocketIo(port, { wsEngine: 'ws', serveClient: false })

  io.on('connection', function(socket) {

    socket.on('join',
      (sessionId, id) => {
        console.log(`user ${sessionId} doc ${id} just joined document ${id}`)
        socket.join(id)
      }
    )

    socket.on('doc:get',
      (sessionId, id, version, doc, send) => {
        console.log(`user ${sessionId} doc ${id} doc:get`)
        console.log(`version ${version}`)
        console.log(`doc`, doc)
        if (!service.hasInstance(id) && version && doc && version > 0 && doc != "") {
          service.patchInstance(id, { version, doc })
        } else if (version && doc && doc != "" && service.getVersion(id) < version) {
          service.patchInstance(id, { version, doc })
        }
        const message = service.getDocMessage(id)
        console.log(message)
        send(message)
      }
    )

    socket.on('steps:get',
      (sessionId, id, version, send) => {
        console.log(`user ${sessionId} doc ${id} steps:get for version ${version}`)
        const message = service.getStepsOrDocMessage(id, version)
        console.log(message)
        send(message)
      }
    )

    socket.on(
      'steps:push',
      (sessionId, id, fromVersion, anonymousSteps, send) => {
        console.log(`user ${sessionId} doc ${id} steps:push ${anonymousSteps.length} steps from version ${fromVersion}`)
        const assignedSteps = anonymousSteps.map(step => ({
          ...step,
          sessionId
        }))

        if (service.getVersion(id) === fromVersion) {
          const nextVersion = service.pushSteps(id, assignedSteps, fromVersion)
          const event = `steps:created:${id}`
          const broadcast = {
            sessionId,
            docId: id,
            version: nextVersion,
            steps: assignedSteps
          }
          console.log(`broadcasting ${event}`)
          console.log(broadcast)
          socket.broadcast.to(id).emit(event, broadcast)
          const message = { ...service.getStepsOrDocMessage(id, fromVersion), sessionId }
          console.log(message)
          send(message)
        } else {
          console.log("returning `false`")
          send(false)
        }
      }
    )

    socket.on('telepointer:push', (sessionId, id, data, send) => {
      console.log(`user ${sessionId} doc ${id} telepointer:push`)
      const event = `telepointer:updated:${id}`
      const broadcast = {
        ...data,
        sessionId,
        docId: id
      }
      console.log(`broadcasting ${event}`)
      console.log(broadcast)
      socket.broadcast.to(id).emit(event, broadcast)
      const message = service.getVersionMessage(id)
      send(message)
    })

    socket.on('disconnect', function() {
      console.log(`Socket ${socket.id} disconnected`)
    })
  })

  return { io, port }
}

export default startCollabServer
