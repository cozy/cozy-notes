import React, { forwardRef } from 'react'
import { Breakpoints } from 'types/enums'

import { SharedRecipients } from 'cozy-sharing'
import ActionsMenuItem from 'cozy-ui/transpiled/react/ActionsMenu/ActionsMenuItem'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import ShareIcon from 'cozy-ui/transpiled/react/Icons/Share'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/ListItemSecondaryAction'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

import { WithBreakpoints } from '../WithBreakpoints'

const makeComponent = (label, icon) => {
  const Component = forwardRef((props, ref) => {
    return (
      <ActionsMenuItem {...props} ref={ref}>
        <ListItemIcon>
          <Icon icon={icon} />
        </ListItemIcon>
        <ListItemText primary={label} />
        <WithBreakpoints showOn={Breakpoints.Mobile}>
          <ListItemSecondaryAction>
            <IconButton>
              <SharedRecipients docId={props.docs[0]._id} size="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </WithBreakpoints>
      </ActionsMenuItem>
    )
  })
  Component.displayName = 'ShareNote'

  return Component
}

export const shareNote = ({ t, onShareNote }) => {
  const label = t('Notes.Files.share.cta')
  const icon = ShareIcon

  return {
    name: 'shareNote',
    label,
    icon,
    action: data => {
      onShareNote(data[0])
    },
    Component: makeComponent(label, icon)
  }
}
