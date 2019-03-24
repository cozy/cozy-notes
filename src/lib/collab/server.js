import express from 'express'
import HTTP from 'http'
import io from 'socket.io'

import { Step } from 'prosemirror-transform'
import schema from './schema'

const port = 3000

const app = express()
const server = HTTP.Server(app)
server.listen(port)

const instances = { }

app.use(express.json())

app.get('/document/:id$', function (req, res) {
  const instanceId = req.params.id
  const {doc, version} = getInstance(instanceId)
  res.send({doc, version})
})


app.get('/document/:id/steps$', function (req, res) {
  const instanceId = req.params.id
  const { version: requestedVersion } = req.query
  res.send( getSteps(instanceId, requestedVersion) )
})

app.post('/document/:id/steps$', function (req, res) {
  const instanceId = req.params.id
  const {version, steps, sessionId } = req.body
  const newSteps = steps.map( (step) => ({...step, sessionId}) )
  const success = pushSteps(instanceId, newSteps, version)
  if (success) {
    res.status(409).send(getSteps(instanceId, version))
  } else {
    res.send({ }) // ok
  }
})

app.post('/document/:id/telepointer$', function (req, res) {
  const instanceId = req.params.id
  const data = req.body
  io.to(instanceId).emit('telepointer:updated', {sessionId, …})
  const { version } = getInstance(instanceId)
  res.send( { version: version } )
})


io.on('connection', function (socket) {
  socket.on('join', function (ids) {
    for (const instanceId of ids) {
      socket.join(instanceId)
    }
  })
  socket.on('disconnect', function () {
    // nothing
  })
});


function initDoc(instanceId) {
  if (!instances[instanceId]) {
    setInstance(instanceId, {
      doc: { }
      steps: [ ],
      version: 1,
      users: new Map()
    })
  }
}

function getInstance(instanceId) {
  initDoc(instanceId)
  return instances[instanceId]
}

function setInstance(instanceId, instance) {
  instances = {
    ...instances,
    [instanceId]: instance
  }
}

function patchInstance(instanceId, patch) {
  const instance = getInstance(instanceId) || { }
  return setInstance(instanceId, { ...instance, ...patch })
}

function getSteps(instanceId, requestedVersion) {
  const { doc, steps, version: currentVersion } = getInstance(instanceId)
  const size = steps.length
  const requestedSteps = currentVersion - requestedVersion
  if ( (requestedSteps < 0) || (requestedSteps > size) ) {
    // return doc if no steps older than version
    return { doc, version: currentVersion }
  } else {
    // return remaining steps
    return { steps: steps.slice(- requestedSteps), version: currentVersion }
  }
}

function pushSteps(instanceId, steps, version) {
  const { previousVersion, previousDoc, history } = getInstance(instanceId)
  if (version !== previousVersion) {
    return false
  } else {
    docSteps = steps.map(s => Step.fromJSON(schema, s))
    const nextVersion = previousVersion + steps.length
    patchInstance(instanceId, {
      doc: docSteps.reduce((doc, step) => step.apply(doc).doc, previousDoc),
      version: nextVersion,
      steps: history.concat(steps)
    })
    io.to(instanceId).emit('steps:created', {steps, nextVersion})
    return true
  }
}

function purgeHistory(instanceId) {
  const { steps } = getInstance(instanceId)
  const MAX_HISTORY = 10000
  if (instance.steps.length > MAX_HISTORY) {
    patchInstance(instanceId, { steps: steps.slice(this.steps.length - MAX_HISTORY) })
  }
}
