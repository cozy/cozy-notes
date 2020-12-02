import React from 'react'
import { mount } from 'enzyme'

import { I18n } from 'cozy-ui/transpiled/react/I18n'

jest.mock('components/notes/sharing', () => () => null)

import en from '../../locales/en.json'
import { AppLike } from '../../../test/Applike'
import SharingWidget from 'components/notes/sharing'
import EditorCorner from './EditorCorner'

describe('EditorCorner', () => {
  const mockDoc = {}
  it('shows the sharing widget on private views', () => {
    const readOnlyComponent = mount(
      <EditorCorner doc={mockDoc} isPublic={false} isReadOnly={true} />,
      {
        wrappingComponent: AppLike
      }
    )
    expect(readOnlyComponent.find(SharingWidget).length).toBe(1)

    const editableComponent = mount(
      <EditorCorner doc={mockDoc} isPublic={false} isReadOnly={false} />,
      {
        wrappingComponent: AppLike
      }
    )
    expect(editableComponent.find(SharingWidget).length).toBe(1)
  })

  it('shows a read only indication on public views', () => {
    const component = mount(
      <EditorCorner doc={mockDoc} isPublic={true} isReadOnly={true} />,
      {
        wrappingComponent: AppLike
      }
    )
    expect(component.children().getElement()).toMatchInlineSnapshot(`
      <WithStyles(WithStyles(Tooltip))
        title="This note is in read-only mode."
      >
        <Icon
          color="var(--primaryTextColor)"
          icon="lock"
          spin={false}
        />
      </WithStyles(WithStyles(Tooltip))>
    `)
  })

  it('renders nothing on a public view with write permissions', () => {
    const component = mount(
      <EditorCorner doc={mockDoc} isPublic={true} isReadOnly={false} />,
      {
        wrappingComponent: AppLike
      }
    )
    expect(component.children().length).toBe(0)
  })
})
