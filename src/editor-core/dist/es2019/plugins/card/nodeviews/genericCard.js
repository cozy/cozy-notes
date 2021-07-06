import _extends from '@babel/runtime/helpers/extends'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import PropTypes from 'prop-types'
import { isSafeUrl } from '@atlaskit/adf-schema'
import { titleUrlPairFromNode } from '../utils'
export function Card(SmartCardComponent, UnsupportedComponent) {
  var _class, _temp

  return (
    (_temp = _class = class extends React.Component {
      constructor(...args) {
        super(...args)

        _defineProperty(this, 'state', {
          isError: false
        })
      }

      render() {
        const { url } = titleUrlPairFromNode(this.props.node)

        if (url && !isSafeUrl(url)) {
          return /*#__PURE__*/ React.createElement(UnsupportedComponent, null)
        }

        if (this.state.isError) {
          if (url) {
            return /*#__PURE__*/ React.createElement(
              'a',
              {
                href: url,
                onClick: e => {
                  e.preventDefault()
                }
              },
              url
            )
          } else {
            return /*#__PURE__*/ React.createElement(UnsupportedComponent, null)
          }
        }

        const cardContext = this.context.contextAdapter
          ? this.context.contextAdapter.card
          : undefined
        return /*#__PURE__*/ React.createElement(
          SmartCardComponent,
          _extends(
            {
              cardContext: cardContext
            },
            this.props
          )
        )
      }

      componentDidCatch(error) {
        const maybeAPIError = error // NB: errors received in this component are propagated by the `@atlaskit/smart-card` component.
        // Depending on the kind of error, the expectation for this component is to either:
        // (1) Render a blue link whilst retaining `inlineCard` in the ADF (non-fatal errs);
        // (2) Render a blue link whilst downgrading to `link` in the ADF (fatal errs).

        if (maybeAPIError.kind && maybeAPIError.kind === 'fatal') {
          // TODO: EDM-340, add proper editor integration here.
          this.setState({
            isError: true
          })
        } else {
          // Otherwise, render a blue link as fallback (above in render()).
          this.setState({
            isError: true
          })
        }
      }
    }),
    _defineProperty(_class, 'contextTypes', {
      contextAdapter: PropTypes.object
    }),
    _temp
  )
}
