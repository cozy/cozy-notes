import { renderHook, act } from '@testing-library/react-hooks'
import useNote from './useNote'
import { getSchemaVersion } from 'lib/collab/schema'

jest.mock('lib/collab/schema', () => ({
  ...jest.requireActual('lib/collab/schema'),
  getSchemaVersion: jest.fn()
}))
describe('useNote', () => {
  const mockedServiceClient = {
    getDoc: jest.fn(),
    updateSchema: jest.fn()
  }
  it('does not update the schema if not needed', async () => {
    getSchemaVersion.mockReturnValue(0)
    mockedServiceClient.getDoc.mockResolvedValue({
      schemaVersion: 0,
      title: 'My Title'
    })
    const { waitForNextUpdate } = renderHook(() =>
      useNote({ serviceClient: mockedServiceClient, noteId: 1 })
    )
    await act(() => waitForNextUpdate())
    expect(mockedServiceClient.getDoc).toHaveBeenCalled()
    expect(mockedServiceClient.updateSchema).not.toHaveBeenCalled()
  })

  it('calls updateSchema if the doc schema is not the current schema for the app', async () => {
    const NEW_SCHEMA_VERSION = 1
    getSchemaVersion.mockReturnValue(NEW_SCHEMA_VERSION)
    mockedServiceClient.getDoc.mockResolvedValue({
      schemaVersion: 0,
      title: 'My Title'
    })
    mockedServiceClient.updateSchema.mockResolvedValue({
      schemaVersion: NEW_SCHEMA_VERSION,
      title: 'My Title'
    })
    const { waitForNextUpdate } = renderHook(() =>
      useNote({ serviceClient: mockedServiceClient, noteId: 1 })
    )
    await act(() => waitForNextUpdate())
    expect(mockedServiceClient.getDoc).toHaveBeenCalled()
    expect(mockedServiceClient.updateSchema).toHaveBeenCalled()
  })
})
