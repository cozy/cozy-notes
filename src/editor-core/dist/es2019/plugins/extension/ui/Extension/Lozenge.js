import _extends from '@babel/runtime/helpers/extends'
import React from 'react'
import { Component } from 'react'
import EditorFileIcon from '@atlaskit/icon/glyph/editor/file'
import { getExtensionLozengeData } from '@atlaskit/editor-common'
import {
  PlaceholderFallback,
  PlaceholderFallbackParams,
  StyledImage
} from './styles'
export const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const ICON_SIZE = 24
export default class ExtensionLozenge extends Component {
  render() {
    const { node } = this.props
    const imageData = getExtensionLozengeData({
      node,
      type: 'image'
    })

    if (imageData && node.type.name !== 'extension') {
      return this.renderImage(imageData)
    }

    const iconData = getExtensionLozengeData({
      node,
      type: 'icon'
    })
    return this.renderFallback(iconData)
  }

  renderImage(lozengeData) {
    const { extensionKey } = this.props.node.attrs
    const { url, ...rest } = lozengeData
    return /*#__PURE__*/ React.createElement(
      StyledImage,
      _extends(
        {
          src: url
        },
        rest,
        {
          alt: extensionKey
        }
      )
    )
  }

  renderFallback(lozengeData) {
    const { parameters, extensionKey } = this.props.node.attrs
    const { name } = this.props.node.type
    const params = parameters && parameters.macroParams
    const title =
      (parameters && parameters.extensionTitle) ||
      (parameters &&
        parameters.macroMetadata &&
        parameters.macroMetadata.title) ||
      extensionKey
    const isBlockExtension = name === 'extension'
    return /*#__PURE__*/ React.createElement(
      PlaceholderFallback,
      null,
      lozengeData && !isBlockExtension
        ? this.renderImage({
            height: ICON_SIZE,
            width: ICON_SIZE,
            ...lozengeData
          })
        : /*#__PURE__*/ React.createElement(EditorFileIcon, {
            label: title
          }),
      /*#__PURE__*/ React.createElement(
        'span',
        {
          className: 'extension-title'
        },
        capitalizeFirstLetter(title)
      ),
      params &&
        !isBlockExtension &&
        /*#__PURE__*/ React.createElement(
          PlaceholderFallbackParams,
          null,
          Object.keys(params).map(
            key => key && ` | ${key} = ${params[key].value}`
          )
        )
    )
  }
}
