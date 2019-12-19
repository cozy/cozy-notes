import { useState, useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
const useFetchNotesByIds = client => {
  const [notes, setNotes] = useState([])
  const [fetchStatus, setFetchStatus] = useState('loading')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: files } = await client.query(
          client
            .all('io.cozy.files')
            .where({
              cozyMetadata: { createdByApp: 'notes' },
              updated_at: { $gt: null }
            })
            .sortBy([
              { 'cozyMetadata.createdByApp': 'desc' },
              { updated_at: 'desc' }
            ])
            .indexFields(['cozyMetadata.createdByApp', 'updated_at'])
        )
        const promiseNotes = files.map(file => {
          return client.getStackClient().fetchJSON('GET', `/notes/${file._id}`)
        })
        const notes = await Promise.all(promiseNotes)
        const filesCloned = cloneDeep(files)
        filesCloned.forEach((file, i) => {
          file.name = get(notes[i], 'data.attributes.name', file.name)
        })
        setNotes(filesCloned)
        setFetchStatus('loaded')
      } catch (error) {
        setFetchStatus('errored')
        console.log({ error })
      }
    }
    fetchData()
  }, [])

  return {
    fetchStatus,
    data: { notes }
  }
}

export default useFetchNotesByIds
