import React from 'react'
import { shallow, mount } from 'enzyme'

import { I18n } from 'cozy-ui/react/I18n'
import en from '../../locales/en.json'

import SharingWidget from 'components/notes/sharing'
import EditorCorner from './EditorCorner'

describe('EditorCorner', () => {
  const mockDoc = {}
  it('shows the sharing widget on private views', () => {
    const readOnlyComponent = shallow(
      <EditorCorner doc={mockDoc} isPublic={false} isReadOnly={true} />
    )
    expect(readOnlyComponent.find(SharingWidget).length).toBe(1)

    const editableComponent = shallow(
      <EditorCorner doc={mockDoc} isPublic={false} isReadOnly={false} />
    )
    expect(editableComponent.find(SharingWidget).length).toBe(1)
  })

  it('shows a read only indication on public views', () => {
    const component = mount(
      <EditorCorner doc={mockDoc} isPublic={true} isReadOnly={true} />,
      {
        wrappingComponent: I18n,
        wrappingComponentProps: {
          lang: 'en',
          dictRequire: () => en
        }
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
    const component = shallow(
      <EditorCorner doc={mockDoc} isPublic={true} isReadOnly={false} />
    )

    expect(component.getElement()).toBe(null)
  })
})
