import get from 'lodash/get'
import { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import { getDataset, getDataOrDefault } from './initFromDom'
import { schemaOrdered } from 'lib/collab/schema'
import { models } from 'cozy-client'

import manifest from '../../manifest.webapp'

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
  url.searchParams.set(returnUrlKey, '#/')
  url.hash = `#/n/${doc.id}`
  return url
}

/**
 * Get permissions on io.cozy.files for current context
 * @private
 * @param {CozyClient} client
 * @returns {object}
 */
async function getFilesOwnPermissions(client) {
  const permissionsData = await client
    .collection('io.cozy.permissions')
    .getOwnPermissions()
  const permissionObject = get(permissionsData, 'data.attributes.permissions')
  if (!permissionObject) throw `can't get self permissions`
  const permissions = Object.values(permissionObject)
  return permissions.filter(perm =>
    models.permission.isForType(perm, 'io.cozy.files')
  )
}

/**
 * Get a file by it's id
 * @private
 * @param {CozyClient} client
 * @param {string} id
 */
async function getFile(client, id) {
  return client
    .query(client.find('io.cozy.files').getById(id))
    .then(data => data && data.data)
}

/**
 * Checks if the note is read-only or read-write
 *
 * @param {CozyClient} client
 * @param {string} fileId - io.cozy.files id
 * @returns {bool}
 */
export async function fetchIfIsNoteReadOnly(client, fileId) {
  const document = await getFile(client, fileId)
  return models.permission.isDocumentReadOnly({
    document,
    client,
    writability: ['PATCH']
  })
}

/**
 * Get the first shared document for the current shared token
 *
 * @param {CozyClient} client
 * @returns {{id, readOnly}} id of the document and the readOnly status
 */
export async function getSharedDocument(client) {
  const permissions = (await getFilesOwnPermissions(client)).filter(
    p =>
      models.permission.isForType(p, 'io.cozy.files') &&
      p.values &&
      p.values.length > 0
  )

  if (permissions.length < 1) {
    throw new Error(
      'No individual io.cozy.files permissions in current context'
    )
  } else if (permissions.length > 1 || permissions[0].values.length > 1) {
    // eslint-disable-next-line no-console
    console.warn(
      `There are more than one permission for a file in current context. Let's take the first one, but it may not be the one you expect`
    )
  }
  const perm = permissions[0]
  const sharedDocumentId = perm.values[0]
  const readOnly = models.permission.isReadOnly(perm, {
    writability: ['PATCH']
  })
  return { id: sharedDocumentId, readOnly }
}

export function getFolderLink(id) {
  return `/folder/${id}`
}

export function getDriveLink(client, id = null) {
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

  return webUrl
}

export function getParentFolderLink(client, file) {
  return getDriveLink(client, models.file.getParentFolderId(file))
}

export function getAppFullName() {
  const dataset = getDataset()
  const appNamePrefix = getDataOrDefault(
    dataset.cozyAppNamePrefix || manifest.name_prefix,
    ''
  )
  const appName = getDataOrDefault(dataset.cozyAppName, manifest.name)
  return appNamePrefix != '' ? `${appNamePrefix} ${appName}` : appName
}

export function createNoteDocument(client) {
  return client.getStackClient().fetchJSON('POST', '/notes', {
    data: {
      type: 'io.cozy.notes.documents',
      attributes: {
        title: '',
        schema: schemaOrdered
      }
    }
  })
}
