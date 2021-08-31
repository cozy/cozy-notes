import React from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Empty from 'cozy-ui/transpiled/react/Empty'
import { withClient } from 'cozy-client'

import Add from 'components/notes/add'
import icon from 'assets/icons/icon_note_empty.svg'
import useReferencedFolderForNote from 'hooks/useReferencedFolderForNote'

import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import { Slugs } from 'constants/strings'

const EmptyComponent = ({ t, client }) => {
  const { notesFolder } = useReferencedFolderForNote(client)
  return (
    <div className="empty">
      <Empty
        id="empty"
        icon={icon}
        title={t('Notes.Empty.welcome')}
        text={
          <AppLinker href={notesFolder} slug={Slugs.Drive}>
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
