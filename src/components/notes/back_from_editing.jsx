import { Slugs } from 'constants/strings'

import IsPublicContext from 'components/IsPublicContext'
import { getFolderLink } from 'lib/utils'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import { deconstructCozyWebLinkWithSlug, models, useClient } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'

/**
 * Simple fake event to detect if the handler
 * tries to prevent the default action
 */
class FakeEvent {
  preventDefault() {
    this.prevented = true
  }
}

/**
 * Create a click handler for a link or button
 *
 * Always call requestToLeave, with a function
 * that should mimic the original behaviour (onClick +  href)
 * @param {function} requestToLeave - as  in useConfirmExit in cozy-ui
 * @param {string} href - URL to go to
 * @param {function} onClick -  regular onClick handler for the button or link
 */
function createOnClick(requestToLeave, href, onClick) {
  const go = () => {
    const ev = new FakeEvent()
    if (onClick) onClick(ev)
    if (!ev.prevented) document.location = href
  }
  return function (ev) {
    ev.preventDefault()
    requestToLeave(go)
  }
}

const getSlugFromUrl = (client, url) => {
  try {
    const { subdomain } = client.getInstanceOptions()

    const { slug } = deconstructCozyWebLinkWithSlug(url, subdomain)

    return slug
  } catch (e) {
    return Slugs.Notes
  }
}

/**
 * React component, draws a button to go back, outside of the editor
 *
 * Default is going back to the root of the app if in a private view
 * or do nothing if in a public view
 * @param {string} [returnUrl] - URL to go back to
 * @param {import('cozy-client/types').IOCozyFile} file - io.cozy.file object to generate a folder link
 * @param {function} [requestToLeave] - function, if present, it should
 * wrap any regular action that should have taken place when clicking the button
 */
export default function BackFromEditing({ returnUrl, file, requestToLeave }) {
  const isPublic = useContext(IsPublicContext)
  const client = useClient()

  if (isPublic) {
    return null
  }

  if (returnUrl) {
    const folderId = models.file.getParentFolderId(file)
    const nativePath = getFolderLink(folderId)

    const slug = getSlugFromUrl(client, returnUrl)

    return (
      <AppLinker app={{ slug: slug }} href={returnUrl} nativePath={nativePath}>
        {({ onClick, href }) => {
          return (
            <IconButton
              component="a"
              href={href}
              onClick={createOnClick(requestToLeave, href, onClick)}
            >
              <Icon icon={PreviousIcon} />
            </IconButton>
          )
        }}
      </AppLinker>
    )
  } else {
    const href = '#/'

    return (
      <IconButton
        component="a"
        href={href}
        onClick={createOnClick(requestToLeave, href)}
      >
        <Icon icon={PreviousIcon} />
      </IconButton>
    )
  }
}

BackFromEditing.propTypes = {
  returnUrl: PropTypes.string,
  file: PropTypes.object.isRequired,
  requestToLeave: PropTypes.func
}
