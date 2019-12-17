import get from 'lodash/get'
import { isMobile } from 'cozy-device-helper'
import {
  generateWebLink,
  generateUniversalLink
} from 'cozy-ui/transpiled/react/AppLinker'

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

function getFolderLink(id) {
  return `/folder/${id.replace(/-/g, '')}`
}

function getFullLink(client, id) {
  const cozyURL = new URL(client.getStackClient().uri)
  const { cozySubdomainType } = client.getInstanceOptions()
  const driveSlug = 'drive'
  const pathForDrive = getFolderLink(id)

  const webUrl = generateWebLink({
    cozyUrl: cozyURL.origin,
    slug: driveSlug,
    subDomainType: cozySubdomainType,
    nativePath: pathForDrive
  })

  /** If no mobile, then return the fallback directly. No need
   * for the universal link
   */
  if (!isMobile()) {
    return webUrl
  }

  const urlWithUL = generateUniversalLink({
    slug: driveSlug,
    fallbackUrl: webUrl,
    nativePath: pathForDrive,
    subDomainType: cozySubdomainType
  })
  return urlWithUL
}

export function getParentFolderLink(client, file) {
  return getFullLink(client, getParentFolderId(file))
}
