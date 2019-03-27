import React from 'react'

import { Link } from 'react-router-dom'

import HeaderMenu from '../header_menu'

import Spinner from 'cozy-ui/react/Spinner'
import Button from 'cozy-ui/react/Button'


export default function (props) {
  const left = <Button
    icon="back"
    tag={Link}
    to="/"
    className="sto-app-back"
    label="Retour à la liste"
    subtle
  />
  return <div>
    <HeaderMenu left={left} />
    <Spinner size="xxlarge" middle />
  </div>
}
