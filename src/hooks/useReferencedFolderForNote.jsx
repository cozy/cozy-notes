import { useState, useEffect } from 'react'
import { CozyFolder } from 'cozy-doctypes'
import { getDriveLink } from 'lib/utils'

const notesFolderDocument = {
  _type: 'io.cozy.apps',
  _id: 'io.cozy.apps/notes'
}

const useReferencedFolderForNote = client => {
  const [notesFolder, setNotesFolder] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const driveUrl = getDriveLink(client)
      try {
        setNotesFolder(driveUrl)
        const referencedFolder = await CozyFolder.getReferencedFolders(
          notesFolderDocument
        )
        const folderUrl = getDriveLink(client, referencedFolder[0]._id)
        setNotesFolder(folderUrl)
      } catch (error) {
        setNotesFolder(driveUrl)
      }
    }
    fetchData()
  }, [])

  return {
    notesFolder
  }
}

export default useReferencedFolderForNote
