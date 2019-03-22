import React, { Component } from 'react'

import { withMutations } from 'cozy-client'

import { withRouter } from 'react-router-dom'

import Input from 'cozy-ui/react/Input'
import Label from 'cozy-ui/react/Label'
import Button from 'cozy-ui/react/Button'

import doctype from './doctype'

class Add extends Component {
  constructor(props, context) {
    super(props, context)
    // initial component state
    this.state = {
      isWorking: false
    }
  }

  handleClick = async (event) => {
    this.setState(() => { isWorking: true })
    const { createDocument } = this.props
    const {data: doc} = await createDocument(doctype, { })
    this.setState(() => { isWorking: false })
    this.props.history.push(`/n/${doc.id}`)
  }

  render() {
    const { isWorking } = this.state
    return <Button
      onClick={this.handleClick}
      type="submit"
      busy={isWorking}
      label="ajouter une note"
      size="large"
      extension="narrow"
    />
  }
}

// get mutations from the client to use createDocument
export default withMutations()(withRouter(Add))
