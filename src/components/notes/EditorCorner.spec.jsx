import React from 'react'
import { render } from '@testing-library/react'

import EditorCorner from './EditorCorner'

jest.mock('components/notes/sharing', () => {
  const MockSharing = () => <div data-testid="SharingWidget" />
  return MockSharing
})

describe('EditorCorner', () => {
  const mockDoc = {}
  it('shows the sharing widget on private views - readOnly', () => {
    const readOnlyComponent = render(
      <EditorCorner doc={mockDoc} isPublic={false} isReadOnly={true} />
    )
    expect(readOnlyComponent.getByTestId('SharingWidget')).toBeTruthy()
  })

  it('shows the sharing widget on private views - editable', () => {
    const editableComponent = render(
      <EditorCorner doc={mockDoc} isPublic={false} isReadOnly={false} />
    )
    expect(editableComponent.getByTestId('SharingWidget')).toBeTruthy()
  })

  it('shows a read only indication on public views', () => {
    const component = render(
      <EditorCorner doc={mockDoc} isPublic={true} isReadOnly={true} />
    )
    expect(component.container).toMatchInlineSnapshot(`
      <div>
        <div>
          <svg
            class="styles__icon___23x3R"
            height="16"
            style="fill: var(--primaryTextColor);"
            title="Notes.Editor.read_only"
            width="16"
          >
            <use
              xlink:href="#lock"
            />
          </svg>
        </div>
      </div>
    `)
  })

  it('renders nothing on a public view with write permissions', () => {
    const component = render(
      <EditorCorner doc={mockDoc} isPublic={true} isReadOnly={false} />
    )
    expect(component.container).toBeEmptyDOMElement()
  })
})
