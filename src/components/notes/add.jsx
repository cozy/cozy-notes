import React, { Component } from 'react'

import { withClient } from 'cozy-client'

import { withRouter } from 'react-router-dom'

import Button from 'cozy-ui/react/Button'

import { schemaOrdered } from '../../lib/collab/schema'

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
    const { client: cozyClient } = this.props
    const { data: doc } = await cozyClient
      .getStackClient()
      .fetchJSON('POST', '/notes', {
        data: {
          type: 'io.cozy.notes.documents',
          attributes: {
            title: '',
            schema: schemaOrdered
          }
        }
      })
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
export default withClient(withRouter(Add))
