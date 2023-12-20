import { Q, fetchPolicies } from 'cozy-client'

const DEFAULT_CACHE_TIMEOUT_QUERIES = 5 * 60 * 1000 // 5 minutes
const defaultFetchPolicy = fetchPolicies.olderThan(
  DEFAULT_CACHE_TIMEOUT_QUERIES
)

export const buildFileByIdQuery = id => ({
  definition: Q('io.cozy.files').getById(id),
  options: {
    as: `io.cozy.files/${id}`,
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true
  }
})
