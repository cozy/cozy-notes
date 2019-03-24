export const getParticipant = userId => ({
  userId,
  name: userId,
  avatar: `https://api.adorable.io/avatars/80/${userId.replace(
    /[^a-zA-Z0-9]/g,
    ''
  )}.png`,
  email: `${userId
    .replace(/\s+/g, '.')
    .replace(/[^a-zA-Z0-9.]/g, '')}.toLocaleLowerCase()}@mycozy.cloud`
})
