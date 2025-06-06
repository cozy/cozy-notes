import { Slugs } from 'constants/strings'

import { useFetchIcons } from 'hooks/useFetchIcons'
import PropTypes from 'prop-types'
import React from 'react'
import { Breakpoints } from 'types/enums'

import { models } from 'cozy-client'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Divider from 'cozy-ui/transpiled/react/Divider'
import Link from 'cozy-ui/transpiled/react/Link'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { HeaderNotePath } from './HeaderNotePath'
import styles from './header_menu.styl'
import { WithBreakpoints } from './notes/List/WithBreakpoints'

/**
 * HeaderMenu component.
 *
 * @component
 * @param {string} props.homeHref - The home href.
 * @param {ReactNode} props.leftComponent - The left component.
 * @param {ReactNode} props.rightComponent - The right component.
 * @param {boolean} props.isPublic - Indicates if the component is public.
 * @param {import('cozy-client/types').IOCozyFile} props.file - The file associated with the editor.
 * @param {ReactNode} props.bannerComponent - The banner component.
 */
const HeaderMenu = ({
  homeHref,
  leftComponent,
  rightComponent,
  isPublic,
  file,
  bannerComponent
}) => {
  const { fetchHomeIcon, fetchNoteIcon } = useFetchIcons()
  const { filename } = models.file.splitFilename(file.attributes)

  return (
    <header>
      <div className={styles['header-menu']}>
        <WithBreakpoints hideOn={Breakpoints.Mobile}>
          <AppLinker app={{ slug: Slugs.Home }} href={homeHref}>
            {({ href }) => (
              <Link
                {...(!isPublic && { href })}
                className={styles['home-link']}
              >
                <AppIcon
                  app={Slugs.Home}
                  alt={Slugs.Home}
                  fetchIcon={fetchHomeIcon}
                />
              </Link>
            )}
          </AppLinker>

          <Divider orientation="vertical" className="u-ml-1" flexItem />
        </WithBreakpoints>

        {leftComponent}

        <div className={styles['file-infos']}>
          <WithBreakpoints hideOn={Breakpoints.Mobile}>
            <AppIcon
              app={file.attributes.cozyMetadata.createdByApp}
              className={styles['app-icon']}
              fetchIcon={fetchNoteIcon}
            />
          </WithBreakpoints>

          <div>
            <Typography>
              <strong>{filename}</strong>
            </Typography>

            {!isPublic && <HeaderNotePath file={file} />}
          </div>
        </div>

        {rightComponent}
      </div>
      {bannerComponent}
    </header>
  )
}

HeaderMenu.propTypes = {
  homeHref: PropTypes.string,
  leftComponent: PropTypes.node,
  rightComponent: PropTypes.node,
  isPublic: PropTypes.bool,
  file: PropTypes.object.isRequired,
  bannerComponent: PropTypes.node
}

export default HeaderMenu
