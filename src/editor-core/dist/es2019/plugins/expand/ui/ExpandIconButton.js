import _extends from "@babel/runtime/helpers/extends";
import React, { useCallback, forwardRef } from 'react';
import Button from '@atlaskit/button/custom-theme-button';
import { expandMessages, ExpandLayoutWrapper } from '@atlaskit/editor-common';
import { akEditorSwoopCubicBezier } from '@atlaskit/editor-shared-styles';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Tooltip from '@atlaskit/tooltip';
import { expandClassNames } from './class-names';
const ExpandLayoutWrapperWithRef = /*#__PURE__*/forwardRef(function WithRef(props, ref) {
  // @ts-ignore: incorrect innerRef typing
  return /*#__PURE__*/React.createElement(ExpandLayoutWrapper, _extends({}, props, {
    innerRef: ref
  }));
});
export const withTooltip = WrapperComponent => {
  return class WithSortableColumn extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        label
      } = this.props;
      return /*#__PURE__*/React.createElement(Tooltip, {
        content: label,
        position: "top",
        tag: ExpandLayoutWrapperWithRef
      }, /*#__PURE__*/React.createElement(WrapperComponent, this.props));
    }

  };
};
export const CustomButton = props => {
  const {
    label,
    allowInteractiveExpand
  } = props;
  const useTheme = useCallback((currentTheme, themeProps) => {
    const {
      buttonStyles,
      ...rest
    } = currentTheme(themeProps);
    return {
      buttonStyles: { ...buttonStyles,
        height: '100%',
        '& svg': {
          transform: props.expanded ? 'transform: rotate(90deg);' : 'tranform: rotate(0deg);',
          transition: `transform 0.2s ${akEditorSwoopCubicBezier};`
        }
      },
      ...rest
    };
  }, [props]);
  return /*#__PURE__*/React.createElement(Button, {
    appearance: "subtle",
    className: expandClassNames.iconContainer,
    iconBefore: /*#__PURE__*/React.createElement(ChevronRightIcon, {
      label: label
    }),
    shouldFitContainer: true,
    theme: useTheme,
    isDisabled: !allowInteractiveExpand
  });
};
const ButtonWithTooltip = withTooltip(CustomButton);
const ButtonWithoutTooltip = CustomButton;
export const ExpandIconButton = props => {
  const {
    expanded,
    intl
  } = props;
  const message = expanded ? expandMessages.collapseNode : expandMessages.expandNode;
  const label = intl && intl.formatMessage(message) || message.defaultMessage; // check to ensure device supports any-hover

  const supportsAnyHover = !!window.matchMedia ? window.matchMedia('(any-hover: hover)').matches !== window.matchMedia('(any-hover: none)').matches : false;
  const hoverEventCheck = supportsAnyHover ? window.matchMedia('(any-hover: hover)').matches : true; // hoverEventCheck is to disable tooltips for mobile to prevent incorrect hover state causing issues on iOS

  if (props.allowInteractiveExpand && hoverEventCheck) {
    return /*#__PURE__*/React.createElement(ButtonWithTooltip, _extends({
      label: label
    }, props));
  }

  return /*#__PURE__*/React.createElement(ExpandLayoutWrapper, null, /*#__PURE__*/React.createElement(ButtonWithoutTooltip, _extends({
    label: label
  }, props)));
};