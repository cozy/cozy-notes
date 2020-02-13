export const getParticipant = ({ userId, sessionId }) => ({
  userId: sessionId,
  sessionId: sessionId || userId,
  name: userId,
  avatar: null,
  email: null
})
