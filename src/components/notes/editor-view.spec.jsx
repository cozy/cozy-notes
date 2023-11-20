import React from 'react'
import { render } from '@testing-library/react'

import EditorView from './editor-view'
import CollabProvider from 'lib/collab/provider'
import { AppLike } from '../../../test/AppLike'

jest.mock('@atlaskit/editor-core', () => ({
  Editor: function Editor(props) {
    return (
      <div
        data-testid="Editor"
        data-should-focus={props.shouldFocus}
        data-disabled={props.disabled}
      >
        {props.contentComponents}
        {props.children}
      </div>
    )
  },
  WithEditorActions: function WithEditorActions(props) {
    return (
      <div>
        {props.render()}
        {props.children}
      </div>
    )
  }
}))

function setupCollabProvider() {
  const noteId = 'myDocId'
  const version = 96
  const channel = {
    on: jest.fn(),
    connect: jest.fn(),
    sendSteps: jest.fn(),
    sendTelepointer: jest.fn(),
    getSteps: jest.fn()
  }
  const service = {
    getSessionId: jest.fn(),
    getUserId: jest.fn(),
    pushSteps: jest.fn(),
    onStepsCreated: jest.fn(),
    onTelepointerUpdated: jest.fn(),
    join: jest.fn(),
    getSteps: jest.fn(),
    pushTelepointer: jest.fn()
  }
  const config = { noteId, version, channel }
  return new CollabProvider(config, service)
}

function mountEditorView({ readOnly, collabProvider }) {
  return render(
    <AppLike>
      <EditorView
        readOnly={readOnly}
        collabProvider={collabProvider}
        defaultTitle="placeholder"
        defaultValue={{ doc: {}, version: 42 }}
        title="title"
      />
    </AppLike>
  )
}

describe('EditorView', () => {
  describe('readOnly', () => {
    describe('when true', () => {
      const readOnly = true
      it('should have a readonly title', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        expect(
          editorView.container.querySelector('textarea').attributes['readonly']
        ).toBeTruthy()
      })

      it('should not focus the editor', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        expect(editorView.getByTestId('Editor')).toHaveAttribute(
          'data-should-focus',
          'false'
        )
      })

      describe('with a collabProvider', () => {
        it('should set the provider readonly', async () => {
          const collabProvider = setupCollabProvider()
          mountEditorView({ collabProvider, readOnly })
          expect(collabProvider.isReadOnly()).toBeTruthy()
        })
      })

      describe('without a collabProvider', () => {
        it('should disable the editor', async () => {
          const collabProvider = undefined
          const editorView = mountEditorView({ collabProvider, readOnly })
          expect(editorView.getByTestId('Editor')).toHaveAttribute(
            'data-disabled',
            'true'
          )
        })
      })
    })

    describe('when false', () => {
      const readOnly = false
      it('should not have a readonly title', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        expect(
          editorView.container.querySelector('textarea').attributes['readonly']
        ).toBeFalsy()
      })

      it('should focus the editor', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        expect(editorView.getByTestId('Editor')).toHaveAttribute(
          'data-should-focus',
          'true'
        )
      })

      describe('with a collabProvider', () => {
        it('should not set the provider readonly', async () => {
          const collabProvider = setupCollabProvider()
          mountEditorView({ collabProvider, readOnly })
          expect(collabProvider.isReadOnly()).toBeFalsy()
        })
      })

      describe('without a collabProvider', () => {
        it('should not disable the editor', async () => {
          const collabProvider = undefined
          const editorView = mountEditorView({ collabProvider, readOnly })
          expect(editorView.container).toMatchSnapshot()
          expect(editorView.getByTestId('Editor')).toHaveAttribute(
            'data-disabled',
            'false'
          )
        })
      })
    })
  })
})
