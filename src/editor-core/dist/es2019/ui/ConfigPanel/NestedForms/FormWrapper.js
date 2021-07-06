import React from 'react'
import styled from 'styled-components'
import { gridSize } from '@atlaskit/theme/constants'
import { multiply } from '@atlaskit/theme/math'
import { N40A } from '@atlaskit/theme/colors'
// eslint-disable-next-line import/no-cycle
import FormContent from '../FormContent'
const ActionsWrapper = styled.div`
  border-top: 1px solid ${N40A};
  margin-top: ${multiply(gridSize, 2)}px;
  padding-top: ${multiply(gridSize, 2)}px;
`

const FormWrapper = ({
  label,
  fields,
  parentName,
  parameters,
  extensionManifest,
  canRemoveFields,
  onClickRemove,
  children,
  onFieldBlur,
  firstVisibleFieldName,
  showTitle = true
}) => {
  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    showTitle && /*#__PURE__*/ React.createElement('h5', null, label),
    /*#__PURE__*/ React.createElement(FormContent, {
      fields: fields,
      parentName: parentName,
      extensionManifest: extensionManifest,
      parameters: parameters,
      canRemoveFields: canRemoveFields,
      onClickRemove: onClickRemove,
      onFieldBlur: onFieldBlur,
      firstVisibleFieldName: firstVisibleFieldName
    }),
    children &&
      /*#__PURE__*/ React.createElement(
        ActionsWrapper,
        {
          testId: 'fieldset-actions'
        },
        children
      )
  )
}

export default FormWrapper
