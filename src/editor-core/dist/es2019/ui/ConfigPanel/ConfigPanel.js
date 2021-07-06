import _extends from '@babel/runtime/helpers/extends'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import memoizeOne from 'memoize-one'
import {
  withAnalyticsContext,
  withAnalyticsEvents
} from '@atlaskit/analytics-next'
import Form from '@atlaskit/form'
import {
  fireAnalyticsEvent,
  EVENT_TYPE,
  ACTION_SUBJECT,
  ACTION
} from '../../plugins/analytics'
import LoadingState from './LoadingState'
import Header from './Header'
import ConfigForm from './Form'
import ErrorMessage from './ErrorMessage'
import { serialize, deserialize } from './transformers'

class ConfigPanel extends React.Component {
  constructor(props) {
    super(props)

    _defineProperty(this, 'handleKeyDown', e => {
      if ((e.key === 'Esc' || e.key === 'Escape') && this.props.closeOnEsc) {
        this.props.onCancel()
      }
    })

    _defineProperty(this, 'handleSubmit', async formData => {
      const { fields, extensionManifest } = this.props

      if (!extensionManifest || !fields) {
        return
      }

      try {
        const serializedData = await serialize(
          extensionManifest,
          formData,
          fields
        )
        this.props.onChange(serializedData)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error serializing parameters`, error)
      }
    })

    _defineProperty(this, 'parseParameters', async (fields, parameters) => {
      const { extensionManifest } = this.props

      if (!extensionManifest || !fields || fields.length === 0) {
        // do not parse while fields are not returned
        return
      }

      if (typeof parameters === 'undefined') {
        this.setState({
          currentParameters: {},
          hasParsedParameters: true
        })
        return
      }

      const currentParameters = await deserialize(
        extensionManifest,
        parameters,
        fields
      )
      this.setState({
        currentParameters,
        hasParsedParameters: true
      })
    })

    _defineProperty(
      this,
      'renderHeader',
      memoizeOne(extensionManifest => {
        const { onCancel, showHeader } = this.props

        if (!showHeader) {
          return null
        }

        return /*#__PURE__*/ React.createElement(Header, {
          icon: extensionManifest.icons['48'],
          title: extensionManifest.title,
          description: extensionManifest.description,
          summary: extensionManifest.summary,
          documentationUrl: extensionManifest.documentationUrl,
          onClose: onCancel
        })
      })
    )

    _defineProperty(this, 'renderBody', (extensionManifest, submitting) => {
      const {
        autoSave,
        autoSaveTrigger,
        errorMessage,
        fields,
        isLoading,
        onCancel
      } = this.props
      const {
        currentParameters,
        hasParsedParameters,
        firstVisibleFieldName
      } = this.state

      if (isLoading || (!hasParsedParameters && errorMessage === null)) {
        return /*#__PURE__*/ React.createElement(LoadingState, null)
      }

      return errorMessage || !fields
        ? /*#__PURE__*/ React.createElement(ErrorMessage, {
            errorMessage: errorMessage || ''
          })
        : /*#__PURE__*/ React.createElement(ConfigForm, {
            extensionManifest: extensionManifest,
            fields: fields,
            parameters: currentParameters,
            onCancel: onCancel,
            autoSave: autoSave,
            autoSaveTrigger: autoSaveTrigger,
            submitting: submitting,
            firstVisibleFieldName: firstVisibleFieldName
          })
    })

    _defineProperty(
      this,
      'getFirstVisibleFieldName',
      memoizeOne(fields => {
        function nonHidden(field) {
          if ('isHidden' in field) {
            return !field.isHidden
          }

          return true
        } // finds the first visible field, true for FieldSets too

        const firstVisibleField = fields.find(nonHidden)
        let newFirstVisibleFieldName

        if (firstVisibleField) {
          // if it was a fieldset, go deeper trying to locate the field
          if (firstVisibleField.type === 'fieldset') {
            const firstVisibleFieldWithinFieldset = firstVisibleField.fields.find(
              nonHidden
            )
            newFirstVisibleFieldName =
              firstVisibleFieldWithinFieldset &&
              firstVisibleFieldWithinFieldset.name
          } else {
            newFirstVisibleFieldName = firstVisibleField.name
          }
        }

        return newFirstVisibleFieldName
      })
    )

    _defineProperty(this, 'setFirstVisibleFieldName', fields => {
      const newFirstVisibleFieldName = this.getFirstVisibleFieldName(fields)

      if (newFirstVisibleFieldName !== this.state.firstVisibleFieldName) {
        this.setState({
          firstVisibleFieldName: newFirstVisibleFieldName
        })
      }
    })

    this.state = {
      hasParsedParameters: false,
      currentParameters: {},
      firstVisibleFieldName: props.fields
        ? this.getFirstVisibleFieldName(props.fields)
        : undefined
    }
  }

  componentDidMount() {
    const { fields, parameters, createAnalyticsEvent } = this.props
    this.parseParameters(fields, parameters)
    fireAnalyticsEvent(createAnalyticsEvent)({
      payload: {
        action: ACTION.OPENED,
        actionSubject: ACTION_SUBJECT.CONFIG_PANEL,
        eventType: EVENT_TYPE.UI,
        attributes: {}
      }
    })
  }

  componentWillUnmount() {
    fireAnalyticsEvent(this.props.createAnalyticsEvent)({
      payload: {
        action: ACTION.CLOSED,
        actionSubject: ACTION_SUBJECT.CONFIG_PANEL,
        eventType: EVENT_TYPE.UI,
        attributes: {}
      }
    })
  }

  componentDidUpdate(prevProps) {
    const { parameters, fields } = this.props

    if (
      (parameters && parameters !== prevProps.parameters) ||
      (fields &&
        (!prevProps.fields || fields.length !== prevProps.fields.length))
    ) {
      this.parseParameters(fields, parameters)
    }

    if (
      fields &&
      (!prevProps.fields || fields.length !== prevProps.fields.length)
    ) {
      this.setFirstVisibleFieldName(fields)
    }
  }

  render() {
    const { extensionManifest } = this.props

    if (!extensionManifest) {
      return /*#__PURE__*/ React.createElement(LoadingState, null)
    }

    return /*#__PURE__*/ React.createElement(
      Form,
      {
        onSubmit: this.handleSubmit
      },
      ({ formProps, submitting }) => {
        return /*#__PURE__*/ React.createElement(
          'form',
          _extends({}, formProps, {
            noValidate: true,
            onKeyDown: this.handleKeyDown,
            'data-testid': 'extension-config-panel'
          }),
          this.renderHeader(extensionManifest),
          this.renderBody(extensionManifest, submitting)
        )
      }
    )
  }
}

export default withAnalyticsContext({
  source: 'ConfigPanel'
})(withAnalyticsEvents()(ConfigPanel))
