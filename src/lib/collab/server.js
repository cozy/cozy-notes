import createSocketIo from 'socket.io'

function startCollabServer(service, port = 3000) {
  var io = createSocketIo(port, { wsEngine: 'ws', serveClient: false })

  io.on('connection', function(socket) {
    socket.on('join', (sessionId, id) => {
      socket.join(id)
    })

    socket.on('doc:get', (sessionId, id, version, doc, send) => {
      if (
        !service.hasInstance(id) &&
        version &&
        doc &&
        version > 0 &&
        doc != ''
      ) {
        service.patchInstance(id, { version, doc })
      } else if (
        version &&
        doc &&
        doc != '' &&
        service.getVersion(id) < version
      ) {
        service.patchInstance(id, { version, doc })
      }
      const message = service.getDocMessage(id)
      send(message)
    })

    socket.on('steps:get', (sessionId, id, version, send) => {
      const message = service.getStepsOrDocMessage(id, version)
      send(message)
    })

    socket.on(
      'steps:push',
      (sessionId, id, fromVersion, anonymousSteps, send) => {
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
          socket.broadcast.to(id).emit(event, broadcast)
          const message = {
            ...service.getStepsOrDocMessage(id, fromVersion),
            sessionId
          }
          send(message)
        } else {
          send(false)
        }
      }
    )

    socket.on('telepointer:push', (sessionId, id, data, send) => {
      const event = `telepointer:updated:${id}`
      const broadcast = {
        ...data,
        sessionId,
        docId: id
      }
      socket.broadcast.to(id).emit(event, broadcast)
      const message = service.getVersionMessage(id)
      send(message)
    })

    socket.on('disconnect', function() {
      // nothing
    })
  })

  return { io, port }
}

export default startCollabServer
