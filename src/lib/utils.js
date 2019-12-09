import get from 'lodash/get'

import { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'

export function getShortNameFromClient(client) {
  const url = new URL(client.getStackClient().uri)
  return url.hostname + Math.floor(Math.random() * 100)
}

function arrToObj(obj = {}, [key, val = true]) {
  obj[key] = val
  return obj
}

export function getReturnUrl() {
  const { returnUrl } = window.location.search
    .substring(1)
    .split('&')
    .map(varval => varval.split('='))
    .reduce(arrToObj, {})
  return returnUrl
}

export async function getSharedDocument(client) {
  const { data: permissionsData } = await client
    .collection('io.cozy.permissions')
    .getOwnPermissions()

  const permissions = permissionsData.attributes.permissions
  // permissions contains several named keys, but the one to use depends on the situation. Using the first one is what we want in all known cases.
  const sharedDocumentId = get(Object.values(permissions), '0.values.0')

  return sharedDocumentId
}

export function getParentFolderId(file) {
  return file.relationships.parent.data.id
}

function getAppDomain(client, app) {
  const cozyURL = new URL(client.getStackClient().uri)
  const { cozySubdomainType } = client.getInstanceOptions()
  return generateWebLink({
    cozyUrl: cozyURL.origin,
    slug: app,
    subDomainType: cozySubdomainType
  })
}

function getFolderLink(client, id) {
  return `${getAppDomain(client, 'drive')}/#/folder/${id.replace(/-/g, '')}`
}

export function getParentFolderLink(client, file) {
  return getFolderLink(client, getParentFolderId(file))
}
