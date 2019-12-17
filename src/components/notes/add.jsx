import React, { Component } from 'react'

import { withClient } from 'cozy-client'

import { withRouter } from 'react-router-dom'

import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import { schemaOrdered } from '../../lib/collab/schema'
import { generateReturnUrlToNotesIndex } from '../../lib/utils'

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

    window.location.href = generateReturnUrlToNotesIndex(doc)
  }

  render() {
    const { isWorking } = this.state
    const { t } = this.props
    return (
      <div>
        <Button
          onClick={this.handleClick}
          type="submit"
          busy={isWorking}
          icon="plus"
          label={t('Notes.Add.add_note')}
          extension="narrow"
        />
      </div>
    )
  }
}

// get mutations from the client to use createDocument
export default translate()(withClient(withRouter(Add)))
