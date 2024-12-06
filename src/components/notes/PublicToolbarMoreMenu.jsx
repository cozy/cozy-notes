import { MoreButton } from 'components/notes/MoreButton'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useRef } from 'react'

import ActionsMenu from 'cozy-ui/transpiled/react/ActionsMenu'

const PublicToolbarMoreMenu = ({ files, actions }) => {
  const moreButtonRef = useRef()

  const [menuIsVisible, setMenuVisible] = useState(false)

  const openMenu = useCallback(() => setMenuVisible(true), [setMenuVisible])
  const closeMenu = useCallback(() => setMenuVisible(false), [setMenuVisible])
  const toggleMenu = useCallback(() => {
    if (menuIsVisible) return closeMenu()
    openMenu()
  }, [closeMenu, openMenu, menuIsVisible])

  if (actions.length === 0) return null

  return (
    <>
      <MoreButton onClick={toggleMenu} ref={moreButtonRef} />
      {menuIsVisible && (
        <ActionsMenu
          open
          onClose={closeMenu}
          ref={moreButtonRef}
          docs={files}
          actions={actions}
        />
      )}
    </>
  )
}

PublicToolbarMoreMenu.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object)
}

export default PublicToolbarMoreMenu
