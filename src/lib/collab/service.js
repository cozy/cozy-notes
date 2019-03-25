import { Step } from 'prosemirror-transform'
import { JSONTransformer } from '@atlaskit/editor-json-transformer'
import schema from './schema'

const jsonTransformer = new JSONTransformer()

const emptyInstance = {
  doc: { type:'doc', content:[ { type:'paragraph' } ] },
  steps: [],
  version: 1
}

const MAX_HISTORY = 10000

class Service {
  constructor() {
    this.instances = {}
  }

  getInstance(id) {
    this.ensureInstance(id)
    return this.instances[id]
  }

  setInstance(id, instance) {
    this.instances = { ...this.instances, [id]: instance }
  }

  patchInstance(id, patch) {
    this.ensureInstance(id)
    this.setInstance(id, { ...this.getInstance(id), ...patch })
  }

  getDocMessage(id) {
    const { doc, version } = this.getInstance(id)
    return { doc, version }
  }

  hasAllStepsSinceVersion(id, previousVersion) {
    const { steps, version } = this.getInstance(id)
    const requestedSteps = version - previousVersion
    const length = steps.length
    return requestedSteps >= 0 && requestedSteps <= length
  }

  getStepsSinceVersion(id, previousVersion) {
    const { steps, version } = this.getInstance(id)
    const requestedSteps = version - previousVersion
    return steps.slice(-requestedSteps)
  }

  getStepsOrDocMessage(id, previousVersion) {
    const has = this.hasAllStepsSinceVersion(id, previousVersion)
    return has
      ? this.getStepsMessage(id, previousVersion)
      : this.getDocMessage(id, previousVersion)
  }

  getStepsMessage(id, previousVersion) {
    const { version } = this.getInstance(id)
    const steps = this.getStepsSinceVersion(id, previousVersion)
    return { steps, version }
  }

  initInstance(id) {
    this.setInstance(id, emptyInstance)
  }

  hasInstance(id) {
    return !!this.instances[id]
  }

  ensureInstance(id) {
    this.hasInstance(id) || this.initInstance(id)
  }

  purgeInstance(id) {
    const { steps } = this.getInstance(id)
    const toRemove = steps.length - MAX_HISTORY
    if (toRemove > 0) {
      this.patchInstance(id, { steps: steps.slice(toRemove) })
    }
  }

  getVersion(id) {
    return this.getInstance(id).version
  }

  getVersionMessage(id) {
    return { version: this.getVersion(id) }
  }

  pushSteps(id, steps, fromVersion) {
    const { version } = this.getInstance(id)
    if (fromVersion !== version) {
      throw `Cannot apply steps from version ${fromVersion} on doc ${id} with version ${version}`
    } else {
      return this.applySteps(id, steps)
    }
  }

  applySteps(id, steps) {
    const {
      doc: previousDoc,
      version: previousVersion,
      steps: history
    } = this.getInstance(id)
    const schemaDoc = schema.nodeFromJSON(previousDoc)
    const docSteps = steps.map(s => Step.fromJSON(schema, s))
    const nextVersion = previousVersion + steps.length
    const updatedSchemaDoc = docSteps.reduce(
      (doc, step) => {
        console.log("to apply", step)
        const update = step.apply(doc)
        console.log("applied", doc)
        return update.doc
      }, schemaDoc
    )
    const updatedDoc = jsonTransformer.encode(updatedSchemaDoc)
    const instance = {
      doc: updatedDoc,
      version: nextVersion,
      steps: history.concat(steps)
    }
    this.patchInstance(id, instance)
    setTimeout(() => this.purgeInstance(id), 100)
    return nextVersion
  }
}

export default Service
