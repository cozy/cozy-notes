import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ForbiddenIcon from 'cozy-ui/transpiled/react/Icons/Forbidden'
import RestoreIcon from 'cozy-ui/transpiled/react/Icons/Restore'
import List from 'cozy-ui/transpiled/react/List'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const DestroyConfirm = ({ noteId, onCancel, onConfirm }) => {
  const { t } = useI18n()
  const client = useClient()
  const [isBusy, setBusy] = useState(false)
  const { showAlert } = useAlert()

  const handleDestroy = async () => {
    try {
      setBusy(true)
      await client.collection('io.cozy.files').deleteFilePermanently(noteId)
      onConfirm()
    } catch (e) {
      showAlert({ message: t('TrashedBanner.deleteError'), severity: 'error' })
      onCancel()
      setBusy(false)
    }
  }

  return (
    <ConfirmDialog
      open
      onClose={onCancel}
      title={t('DestroyConfirm.title')}
      content={
        <List>
          <ListItem gutters="disabled" size="small">
            <ListItemIcon>
              <Icon icon={ForbiddenIcon} />
            </ListItemIcon>
            <ListItemText primary={t(`DestroyConfirm.forbidden`)} />
          </ListItem>
          <ListItem gutters="disabled" size="small">
            <ListItemIcon>
              <Icon icon={RestoreIcon} />
            </ListItemIcon>
            <ListItemText primary={t(`DestroyConfirm.restore`)} />
          </ListItem>
        </List>
      }
      actions={
        <>
          <Button
            variant="secondary"
            onClick={onCancel}
            label={t('DestroyConfirm.cancel')}
            disabled={isBusy}
          />
          <Button
            color="error"
            onClick={handleDestroy}
            label={t('DestroyConfirm.delete')}
            busy={isBusy}
          />
        </>
      }
    />
  )
}

export { DestroyConfirm }
