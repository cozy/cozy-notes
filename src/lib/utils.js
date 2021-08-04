import get from 'lodash/get'
import { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import { getDataset, getDataOrDefault } from './initFromDom'
import { schemaOrdered, schemaVersion } from 'lib/collab/schema'
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

/**
 * Create the URL to be used to edit a note
 *
 * @param {CozyClient} client
 * @param {object} doc - couchdb document for the note/file
 * @return {string} URL where one can edit the note
 */
export async function generateReturnUrlToNotesIndex(client, doc) {
  const rawUrl = models.note.fetchURL(client, doc)
  const back = window.location.toString()
  const dest = new URL(await rawUrl)
  dest.searchParams.set(returnUrlKey, back)
  return dest.toString()
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
        schema: {
          ...schemaOrdered,
          version: schemaVersion
        }
      }
    }
  })
}

// constants
const sec = 1000
const min = 60 * sec
const hour = 60 * min
const day = 24 * hour
const month = 31 * day
const year = 365 * day

// differents steps for message formating
// [age, key, unit, coef] :
// - `age`: the line applies only if the last saved
// was done less than this `age` ago
// (only the first match will apply)
// - `key` is the traduction key for the message
// - `unit` is the unit in which we will send the time
// to the translated message
// - `coef` is  the granularity in which we will send
// the time (`min, 5` is "by 5 minutes slices")
const defaultSteps = [
  [10 * sec, 'just_now', sec, 1],
  [1 * min, 'secs_ago', sec, 10],
  [2 * min, 'min_ago', min, 1],
  [5 * min, 'mins_ago', min, 1],
  [20 * min, 'mins_ago', min, 5],
  [1 * hour, 'mins_ago', min, 10],
  [2 * hour, 'hour_ago', hour, 1],
  [1 * day, 'hours_ago', hour, 1],
  [2 * day, 'day_ago', day, 1],
  [1 * month, 'days_ago', day, 1],
  [2 * month, 'month_ago', month, 1],
  [1 * year, 'monthes_ago', month, 1],
  [2 * year, 'year_ago', year, 1],
  [Infinity, 'years_ago', year, 1]
]

/**
 * @typedef {object} RelativeAge
 * @property {string} key - translation (sub) key
 * @property {unit} unit - unit (minute, second, hour…) in which the age will be displayed
 * @property {integer} coef - in how much values of this unit do we count (like every 10 minutes)
 * @property {integer} time - age to be inserted in the translation message
 * @property {integer} interval - `unit * coef`: compute again in that timeframe (in milliseconds)
 */
/**
 * Gets raw data to display a relative age in human words
 * @param {integer} age - age in milliseconds
 * @param {array} steps - array of [max_age, key, unit, coef]
 * @returns {RelativeAge}
 */
export function relativeAge(age, steps) {
  const step = (steps || defaultSteps).find(el => age < el[0])
  const [, key, unit, coef] = step
  return {
    key,
    unit,
    coef,
    time: Math.floor(age / unit / coef) * coef,
    interval: unit * coef
  }
}

/**
 * Gets the username defined by the current URL, if any
 *
 * @returns {string|null} username
 */
export function getUserNameFromUrl() {
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('username')) {
    return searchParams.get('username')
  } else {
    return null
  }
}
