import React from 'react'
import { render } from '@testing-library/react'

jest.mock('components/notes/sharing', () => () => null)

import EditorCorner from './EditorCorner'
jest.mock('cozy-ui/transpiled/react/I18n', () => ({
  useI18n: () => ({ t: x => x })
}))

jest.mock('components/notes/sharing', () => () => (
  <div data-testid="SharingWidget"></div>
))
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
