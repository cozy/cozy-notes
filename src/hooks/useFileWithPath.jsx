import { useEffect, useState } from 'react'

import { models } from 'cozy-client'

export const normalizeAndAddName = rawFile => {
  const normalizedFile = models.file.normalize(rawFile)

  if (normalizedFile.name) {
    return normalizedFile
  }

  return {
    name: normalizedFile.attributes?.name ?? undefined,
    ...normalizedFile
  }
}

function useFileWithPath({ cozyClient, file }) {
  const [fileWithPath, setFileWithPath] = useState(undefined)
  useEffect(() => {
    async function getParent(rawFile) {
      const file = normalizeAndAddName(rawFile)

      try {
        const parent = await cozyClient.query(
          cozyClient.get('io.cozy.files', file.attributes.dir_id)
        )
        setFileWithPath(models.file.ensureFilePath(file, parent.data))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(
          `Request failed when try to fetch the parent ${file.attributes.dir_id} of io.cozy.files ${file.id}`
        )
        setFileWithPath(null)
        // nothing to do here
        // @TODO send a sentry event
      }
    }

    getParent(file)
  }, [cozyClient, file, file.attributes.dir_id])

  if (fileWithPath && fileWithPath.id == file.id) {
    return fileWithPath
  } else {
    return undefined
  }
}

export default useFileWithPath
