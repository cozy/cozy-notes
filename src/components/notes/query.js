import doctype from './doctype'
export default client =>
  client
    .find(doctype)
    .where({})
    .sortBy({ 'cozyMetadata.updatedAt': 'desc' })
