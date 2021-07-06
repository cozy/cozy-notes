import React from 'react'
import Tooltip from '@atlaskit/tooltip'
import Button from '@atlaskit/button/custom-theme-button'
import { getButtonStyles, iconOnlySpacing } from './styles'
export default ({
  title,
  icon,
  iconAfter,
  onClick,
  onMouseEnter,
  onMouseLeave,
  selected,
  disabled,
  href,
  target,
  appearance = 'subtle',
  children,
  className,
  tooltipContent,
  testId,
  hideTooltipOnClick = true
}) => {
  // Check if there's only an icon and add additional styles
  const iconOnly = (icon || iconAfter) && !children
  const customSpacing = iconOnly ? iconOnlySpacing : {}
  return /*#__PURE__*/ React.createElement(
    Tooltip,
    {
      content: tooltipContent || title,
      hideTooltipOnClick: hideTooltipOnClick,
      position: 'top'
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      },
      /*#__PURE__*/ React.createElement(
        Button,
        {
          className: className,
          theme: (adgTheme, themeProps) => {
            const { buttonStyles, ...rest } = adgTheme(themeProps)
            return {
              buttonStyles: {
                ...buttonStyles,
                ...customSpacing,
                ...(appearance === 'danger' &&
                  getButtonStyles({
                    appearance,
                    state: themeProps.state,
                    mode: themeProps.mode
                  }))
              },
              ...rest
            }
          },
          'aria-label': title,
          spacing: 'compact',
          href: href,
          target: target,
          appearance: appearance,
          'aria-haspopup': true,
          iconBefore: icon || undefined,
          iconAfter: iconAfter,
          onClick: onClick,
          isSelected: selected,
          isDisabled: disabled,
          testId: testId
        },
        children
      )
    )
  )
}
