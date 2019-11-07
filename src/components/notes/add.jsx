import React, { Component } from 'react'

import { withMutations } from 'cozy-client'

import { withRouter } from 'react-router-dom'

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

  handleClick = async () => {
    this.setState(() => {
      true
    })
    const { createDocument } = this.props
    const { data: doc } = await createDocument(doctype, {})
    this.setState(() => {
      false
    })
    this.props.history.push(`/n/${doc.id}`)
  }

  render() {
    const { isWorking } = this.state
    return (
      <div>
        <Button
          onClick={this.handleClick}
          type="submit"
          busy={isWorking}
          icon="plus"
          label="ajouter une note"
          extension="narrow"
        />
      </div>
    )
  }
}

// get mutations from the client to use createDocument
export default withMutations()(withRouter(Add))
