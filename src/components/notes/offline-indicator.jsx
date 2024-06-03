import React from 'react'
import ReactDOM from 'react-dom'
import Grid from 'cozy-ui/transpiled/react/Grid'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Chip from 'cozy-ui/transpiled/react/deprecated/Chip'
import Tooltip from 'cozy-ui/transpiled/react/Tooltip'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { withStyles } from 'cozy-ui/transpiled/react/styles'

import styles from 'components/notes/offline-indicator.styl'

const tooltipStyles = {
  tooltipPlacementBottom: {
    margin: '12px 24px'
  },
  tooltipPlacementTop: {
    margin: '12px 24px'
  }
}

const StyledTooltip = withStyles(tooltipStyles, { name: 'MuiTooltip' })(Tooltip)

/**
 * Large tooltip, for browser view
 *
 * @param {object} props
 * @param {boolean} props.open - true if we should force the tooltip to be opened
 * @param {*} props.content - what to display inside the banner
 * @param {*} props.children - the saving indicator
 */
function Balloon(props) {
  // We add a dynamic `key`property to throw the old
  // instance and get a new one if the `open` property changes.
  // This is because we want to force the tooltip to be open
  // for a few seconds (and MUI initializes the component to
  // a controlled one) but we want the automatic (no-controlled)
  // mode afterwards
  return (
    <StyledTooltip
      title={props.content}
      open={props.open || undefined}
      key={props.open ? 'open' : 'auto'}
    >
      {props.children}
    </StyledTooltip>
  )
}

/**
 * Banner on top of the editor, for mobile view
 *
 * @param {object} props
 * @param {Ref} props.bannerRef - where to display the banner
 * @param {*} props.content - what to display inside the banner
 * @param {*} props.children - the saving indicator
 */
function Banner(props) {
  const ref = props.bannerRef && props.bannerRef.current

  if (ref) {
    return ReactDOM.createPortal(
      <div className={styles.banner}>{props.content}</div>,
      ref
    )
  }

  return null
}

/**
 * Adds an indicator when offline
 *
 * It's mapped to a tooltip for browser views
 * and to a banner for mobile views
 * @param {object} props
 * @param {boolean} props.open - true if we should force the tooltip to be opened
 * @param {Ref} props.bannerRef - where to display the banner
 * @param {*} props.children - the saving indicator
 */
export default function OfflineIndicator(props) {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()

  const content = (
    <Grid
      direction="row"
      container
      wrap="nowrap"
      spacing={1}
      className={styles.grid}
    >
      <Grid item>
        <Chip.Round className={styles.chip}>
          <Icon icon="offline" color="var(--iconTextColor)" />
        </Chip.Round>
      </Grid>
      <Grid item>{t('Notes.OfflineIndicator.message')}</Grid>
    </Grid>
  )

  const Component = isMobile ? Banner : Balloon

  return (
    <Component open={props.open} content={content} bannerRef={props.bannerRef}>
      {props.children}
    </Component>
  )
}
