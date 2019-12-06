import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonLink } from 'cozy-ui/react/Button'
import IsPublic from '../IsPublic'

function arrToObj(obj = {}, [key, val = true]) {
  obj[key] = val
  return obj
}

function getReturnUrl() {
  const { returnUrl } = window.location.search
    .substring(1)
    .split('&')
    .map(varval => varval.split('='))
    .reduce(arrToObj, {})
  return returnUrl
}

export default function BackFromEditing() {
  const isPublic = useContext(IsPublic)
  const returnUrl = useMemo(() => isPublic && getReturnUrl(), [])
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
