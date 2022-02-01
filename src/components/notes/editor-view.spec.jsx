import React from 'react'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { mount } from 'enzyme'

import EditorView from './editor-view'
import CollabProvider from 'lib/collab/provider'
import en from '../../locales/en.json'

import { MainTitle } from 'cozy-ui/transpiled/react/Text'
import Textarea from 'cozy-ui/transpiled/react/Textarea'

// eslint-disable-next-line no-unused-vars
import { Editor, WithEditorActions } from '@atlaskit/editor-core'
jest.mock('@atlaskit/editor-core', () => ({
  Editor: function Editor(props) {
    return (
      <div>
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
  return mount(
    <EditorView
      readOnly={readOnly}
      collabProvider={collabProvider}
      defaultTitle="placeholder"
      defaultValue={{ doc: {}, version: 42 }}
      title="title"
    />,
    {
      wrappingComponent: I18n,
      wrappingComponentProps: {
        lang: 'en',
        dictRequire: () => en
      }
    }
  )
}

describe('EditorView', () => {
  describe('readOnly', () => {
    describe('when true', () => {
      const readOnly = true
      it('should have a readonly title', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        const title = editorView.find(MainTitle).first().find(Textarea).first()
        expect(title.prop('readOnly')).toBeTruthy()
      })

      it('should not focus the editor', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        const editor = editorView.find(Editor).first()
        expect(editor.prop('shouldFocus')).toBeFalsy()
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
          const editor = editorView.find(Editor).first()
          expect(editor.prop('disabled')).toBeTruthy()
        })
      })
    })

    describe('when false', () => {
      const readOnly = false
      it('should not have a readonly title', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        const title = editorView.find(MainTitle).first().find(Textarea).first()
        expect(title.prop('readOnly')).toBeFalsy()
      })

      it('should focus the editor', async () => {
        const collabProvider = setupCollabProvider()
        const editorView = mountEditorView({ collabProvider, readOnly })
        const editor = editorView.find(Editor).first()
        expect(editor.prop('shouldFocus')).toBeTruthy()
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
          const editor = editorView.find(Editor).first()
          expect(editor.prop('disabled')).toBeFalsy()
        })
      })
    })
  })
})
