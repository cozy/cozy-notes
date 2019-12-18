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

const returnUrlKey = 'returnUrl'

export function getReturnUrl() {
  const searchParams = new URLSearchParams(window.location.search)
  for (const [key, value] of searchParams) {
    if (key === returnUrlKey) {
      return value
    }
  }
  return undefined
}

export const generateReturnUrlToNotesIndex = doc => {
  const url = new URL(window.location)
  url.searchParams.append(returnUrlKey, window.location.origin)
  url.hash = `#/n/${doc.id}`
  return url
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

export function getFullLink(client, id = null) {
  const cozyURL = new URL(client.getStackClient().uri)
  const { cozySubdomainType } = client.getInstanceOptions()
  const driveSlug = 'drive'
  const pathForDrive = id !== null ? getFolderLink(id) : ''

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
