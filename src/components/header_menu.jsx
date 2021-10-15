import React, { useMemo } from 'react'

import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import Link from 'cozy-ui/transpiled/react/Link'
import { SharedRecipients } from 'cozy-sharing'
import { Typography } from '@material-ui/core'
import { Slugs } from 'constants/strings'
import { NotePath } from './notes/List/NotePath'
import { CozyFile } from 'cozy-doctypes'
import { getDriveLink } from 'lib/utils'

import styles from './header_menu.styl'
import { WithBreakpoints } from './notes/List/WithBreakpoints'
import { Breakpoints } from 'types/enums'

const HeaderMenu = ({
  homeHref,
  backFromEditing,
  editorCorner,
  isPublic,
  file,
  client
}) => {
  const drivePath = useMemo(
    () => getDriveLink(client, file.attributes.dir_id),
    [client, file.attributes.dir_id]
  )

  const { filename } = CozyFile.splitFilename(file.attributes)

  return (
    <header className={styles['header-menu']}>
      <WithBreakpoints hideOn={Breakpoints.Mobile}>
        <AppLinker slug={Slugs.Home} href={homeHref}>
          {({ href }) => (
            <Link {...(!isPublic && { href })} className={styles['home-link']}>
              <AppIcon app={Slugs.Home} alt={Slugs.Home} />
            </Link>
          )}
        </AppLinker>

        <Divider orientation="vertical" className={styles['divider']} />
      </WithBreakpoints>

      {backFromEditing && <div className="u-mr-1">{backFromEditing}</div>}

      <div className={styles['file-infos']}>
        <WithBreakpoints hideOn={Breakpoints.Mobile}>
          <AppIcon
            app={file.attributes.cozyMetadata.createdByApp}
            className={styles['app-icon']}
          />
        </WithBreakpoints>

        <div>
          <Typography>
            <strong>{filename}</strong>
          </Typography>

          <WithBreakpoints hideOn={Breakpoints.Mobile}>
            <NotePath
              drivePath={drivePath}
              path={file.attributes.path || drivePath}
              target="_blank"
            />
          </WithBreakpoints>
        </div>
      </div>

      <WithBreakpoints hideOn={Breakpoints.Mobile}>
        <SharedRecipients docId={file.id} size={24} />
      </WithBreakpoints>

      {editorCorner}
    </header>
  )
}

export default HeaderMenu
