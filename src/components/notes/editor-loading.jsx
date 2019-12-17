import React from 'react'

import { Link } from 'react-router-dom'

import HeaderMenu from '../header_menu'

import Spinner from 'cozy-ui/react/Spinner'
import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

function EditorLoading(props) {
  const { t } = props
  const left = (
    <Button
      icon="back"
      tag={Link}
      to="/"
      className="sto-app-back"
      label={t('Notes.EditorLoading.back_to_list')}
      subtle
    />
  )
  return (
    <div>
      <HeaderMenu left={left} />
      <Spinner size="xxlarge" middle />
    </div>
  )
}

export default translate()(EditorLoading)
