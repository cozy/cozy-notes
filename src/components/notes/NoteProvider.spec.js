import React from 'react'
import { render, screen } from '@testing-library/react'
import { getSchemaVersion } from 'lib/collab/schema'
import { NoteProvider, useNoteContext } from 'components/notes/NoteProvider'
import { AppLike } from 'test/AppLike'
import { createMockClient } from 'cozy-client'
import useServiceClient from 'hooks/useServiceClient'

const NEW_SCHEMA_VERSION = 1

jest.mock('lib/collab/schema', () => ({
  ...jest.requireActual('lib/collab/schema'),
  getSchemaVersion: jest.fn()
}))
jest.mock('hooks/useServiceClient')

const TestComponent = () => {
  const { status, title } = useNoteContext()

  if (status === 'loaded') return <div>{title}</div>

  if (status === 'error') return <div>Error</div>

  return <div>Loading...</div>
}

describe('NoteProvider', () => {
  const mockFormattedDoc = jest.fn()
  const mockUpdateSchema = jest.fn()

  const setup = ({ newSchemaVersion = 0 } = {}) => {
    useServiceClient.mockReturnValue({
      getFormatedDoc: mockFormattedDoc.mockReturnValue({
        schemaVersion: 0,
        title: 'My Title',
        doc: {
          file: {
            id: 'id123'
          }
        }
      }),
      updateSchema: mockUpdateSchema.mockResolvedValue({
        schemaVersion: newSchemaVersion,
        title: 'My Title',
        doc: {
          file: {
            id: 'id123'
          }
        }
      })
    })

    const mockClient = createMockClient({
      queries: {
        'io.cozy.notes/id123': {
          doctype: 'io.cozy.notes',
          definition: {
            doctype: 'io.cozy.notes',
            id: 'io.cozy.notes/id123'
          },
          data: [
            {
              id: 'id123'
            }
          ]
        }
      },
      clientOptions: {
        uri: 'http://cozy.example.com'
      }
    })
    return render(
      <AppLike client={mockClient}>
        <NoteProvider noteId="id123">
          <TestComponent />
        </NoteProvider>
      </AppLike>
    )
  }

  it('does not update the schema if not needed', async () => {
    getSchemaVersion.mockReturnValue(0)

    setup()

    const title = await screen.findByText('My Title')
    expect(title).toBeInTheDocument()

    expect(mockFormattedDoc).toHaveBeenCalled()
    expect(mockUpdateSchema).not.toHaveBeenCalled()
  })

  it('calls updateSchema if the doc schema is not the current schema for the app', async () => {
    getSchemaVersion.mockReturnValue(NEW_SCHEMA_VERSION)

    setup({ newSchemaVersion: NEW_SCHEMA_VERSION })

    const title = await screen.findByText('My Title')
    expect(title).toBeInTheDocument()

    expect(mockFormattedDoc).toHaveBeenCalled()
    expect(mockUpdateSchema).toHaveBeenCalled()
  })
})
