export class Participants {
  constructor(participants = new Map()) {
    this.participants = participants
  }

  add(data) {
    const newSet = new Map(this.participants)
    data.forEach(participant => {
      newSet.set(participant.sessionId, participant)
    })
    return new Participants(newSet)
  }

  remove(sessionIds) {
    const newSet = new Map(this.participants)
    sessionIds.forEach(sessionId => {
      newSet.delete(sessionId)
    })
    return new Participants(newSet)
  }

  update(sessionId, lastActive) {
    const newSet = new Map(this.participants)
    const data = newSet.get(sessionId)

    if (!data) {
      return this
    }

    newSet.set(sessionId, { ...data, lastActive })
    return new Participants(newSet)
  }

  toArray() {
    return Array.from(this.participants.values())
  }

  get(sessionId) {
    return this.participants.get(sessionId)
  }

  size() {
    return this.participants.size
  }

  eq(other) {
    const left = this.toArray()
      .map(p => p.sessionId)
      .sort((a, b) => (a > b ? -1 : 1))
      .join('')
    const right = other
      .toArray()
      .map(p => p.sessionId)
      .sort((a, b) => (a > b ? -1 : 1))
      .join('')
    return left === right
  }
}
