export const defaultTitle = (note) => {
  const createdAt = note && note.cozyMetadata && note.cozyMetadata.createdAt
  return createdAt ? `Note sans titre du ${(new Date(createdAt)).toLocaleString()}` : null
}

export const titleWithDefault = (note, fallback=defaultTitle) => {
  return note.title ||
    ((fallback instanceof Function) ? fallback(note) : fallback)
}

export default { defaultTitle, titleWithDefault }
