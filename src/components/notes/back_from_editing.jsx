import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonLink } from 'cozy-ui/react/Button'
import IsPublic from '../IsPublic'

export default function BackFromEditing({ returnUrl }) {
  const isPublic = useContext(IsPublic)
  if (returnUrl) {
    return (
      <ButtonLink
        icon="previous"
        href={returnUrl}
        className="sto-app-back"
        subtle
      />
    )
  } else if (!isPublic) {
    return (
      <Button
        icon="previous"
        tag={Link}
        to="/"
        className="sto-app-back"
        subtle
      />
    )
  } else {
    return null
  }
}
