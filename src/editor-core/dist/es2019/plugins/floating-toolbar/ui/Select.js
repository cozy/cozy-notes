import _defineProperty from '@babel/runtime/helpers/defineProperty'
import React from 'react'
import { Component } from 'react'
import styled from 'styled-components'
import Select from '@atlaskit/select'
const SelectWrapper = styled.div`
  width: ${props => props.width}px;
`
export default class Search extends Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'state', {
      isOpen: false
    })
  }

  render() {
    const {
      options,
      onChange,
      defaultValue,
      placeholder,
      width = 200,
      filterOption
    } = this.props
    return /*#__PURE__*/ React.createElement(
      SelectWrapper,
      {
        width: width
      },
      /*#__PURE__*/ React.createElement(Select, {
        options: options,
        value: defaultValue,
        onChange: onChange,
        placeholder: placeholder,
        spacing: 'compact',
        menuPlacement: 'auto',
        filterOption: filterOption
      })
    )
  }
}
