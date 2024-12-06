import { Slugs } from 'constants/strings'

import icon from 'assets/icons/icon_note_empty.svg'
import Add from 'components/notes/add'
import useReferencedFolderForNote from 'hooks/useReferencedFolderForNote'
import React from 'react'

import { withClient } from 'cozy-client'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import Empty from 'cozy-ui/transpiled/react/Empty'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

const EmptyComponent = ({ t, client }) => {
  const { notesFolder } = useReferencedFolderForNote(client)
  return (
    <div className="empty">
      <Empty
        id="empty"
        icon={icon}
        title={t('Notes.Empty.welcome')}
        text={
          <AppLinker href={notesFolder} app={{ slug: Slugs.Drive }}>
            {({ href, onClick }) => {
              return (
                <span className="u-mb-half">
                  {t('Notes.Empty.after_created')}{' '}
                  <a href={href} onClick={onClick}>
                    Cozy Drive
                  </a>
                  .
                </span>
              )
            }}
          </AppLinker>
        }
      >
        <Add className="u-mt-1" />
      </Empty>
    </div>
  )
}

export default translate()(withClient(EmptyComponent))
