import { useState, useEffect } from 'react'
import { CozyFolder } from 'cozy-doctypes'
import { getDriveLink } from 'lib/utils'

const notesFolderDocument = {
  _type: 'io.cozy.apps',
  _id: 'io.cozy.apps/notes'
}

const useReferencedFolderForNote = client => {
  const [notesFolder, setNotesFolder] = useState(getDriveLink(client))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const referencedFolder = await CozyFolder.getReferencedFolders(
          notesFolderDocument
        )
        const folderUrl = getDriveLink(client, referencedFolder[0]._id)
        setNotesFolder(folderUrl)
      } catch (error) {
        setNotesFolder(getDriveLink(client))
      }
    }
    fetchData()
  }, [])

  return {
    notesFolder
  }
}

export default useReferencedFolderForNote
