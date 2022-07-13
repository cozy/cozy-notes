import React from 'react'

import { models } from 'cozy-client'
import { SharedRecipients } from 'cozy-sharing'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Link from 'cozy-ui/transpiled/react/Link'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { Slugs } from 'constants/strings'
import { Breakpoints } from 'types/enums'
import { WithBreakpoints } from './notes/List/WithBreakpoints'
import styles from './header_menu.styl'
import { useFetchIcons } from 'hooks/useFetchIcons'
import { HeaderNotePath } from './HeaderNotePath'

const HeaderMenu = ({
  homeHref,
  leftComponent,
  rightComponent,
  isPublic,
  file,
  primaryToolBarComponents
}) => {
  const { fetchHomeIcon, fetchNoteIcon } = useFetchIcons()
  const { filename } = models.file.splitFilename(file.attributes)

  return (
    <header className={styles['header-menu']}>
      <WithBreakpoints hideOn={Breakpoints.Mobile}>
        <AppLinker app={{ slug: Slugs.Home }} href={homeHref}>
          {({ href }) => (
            <Link {...(!isPublic && { href })} className={styles['home-link']}>
              <AppIcon
                app={Slugs.Home}
                alt={Slugs.Home}
                fetchIcon={fetchHomeIcon}
              />
            </Link>
          )}
        </AppLinker>

        <Divider orientation="vertical" className="u-mh-1" />
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

      <WithBreakpoints hideOn={Breakpoints.Mobile}>
        <SharedRecipients docId={file.id} size={32} />
      </WithBreakpoints>

      {rightComponent}

      {primaryToolBarComponents}
    </header>
  )
}

export default HeaderMenu
