import React, { useCallback, useEffect, useRef } from 'react'
import { injectIntl } from 'react-intl'
import ButtonGroup from '@atlaskit/button/button-group'
import Button from '@atlaskit/button/custom-theme-button'
import { FormFooter } from '@atlaskit/form'
import FormContent from './FormContent'
import { messages } from './messages'

function Form({
  intl,
  fields,
  onCancel,
  extensionManifest,
  parameters,
  autoSave,
  autoSaveTrigger,
  submitting,
  firstVisibleFieldName
}) {
  const submitButtonRef = useRef(null)
  const tryAutoSave = useCallback(() => {
    if (!autoSave) {
      return
    }

    if (submitButtonRef.current) {
      submitButtonRef.current.click()
    }
  }, [autoSave, submitButtonRef])
  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(tryAutoSave, [autoSaveTrigger])
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(FormContent, {
      fields: fields,
      parameters: parameters,
      extensionManifest: extensionManifest,
      onFieldBlur: tryAutoSave,
      firstVisibleFieldName: firstVisibleFieldName
    }),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: autoSave
          ? {
              display: 'none'
            }
          : {}
      },
      /*#__PURE__*/ React.createElement(
        FormFooter,
        {
          align: 'start'
        },
        /*#__PURE__*/ React.createElement(
          ButtonGroup,
          null,
          /*#__PURE__*/ React.createElement(
            Button,
            {
              type: 'submit',
              appearance: 'primary',
              ref: submitButtonRef
            },
            intl.formatMessage(messages.submit)
          ),
          /*#__PURE__*/ React.createElement(
            Button,
            {
              appearance: 'default',
              isDisabled: submitting,
              onClick: onCancel
            },
            intl.formatMessage(messages.cancel)
          )
        )
      )
    )
  )
}

export default injectIntl(Form)
