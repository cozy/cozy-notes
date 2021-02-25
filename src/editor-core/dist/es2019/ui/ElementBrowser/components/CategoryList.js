import _extends from "@babel/runtime/helpers/extends";
import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { N800, B400, B50 } from '@atlaskit/theme/colors';
import Button from '@atlaskit/button/custom-theme-button';
import { withAnalyticsContext } from '@atlaskit/analytics-next';
import { DEVICE_BREAKPOINT_NUMBERS, GRID_SIZE } from '../constants';
import useFocus from '../hooks/use-focus';

function CategoryList({
  categories = [],
  ...props
}) {
  const [focusedCategoryIndex, setFocusedCategoryIndex] = React.useState(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, categories.map((category, index) => /*#__PURE__*/React.createElement(CategoryListItem, _extends({
    key: category.title,
    index: index,
    category: category,
    focus: focusedCategoryIndex === index,
    setFocusedCategoryIndex: setFocusedCategoryIndex
  }, props))));
}

function CategoryListItem({
  category,
  onSelectCategory,
  selectedCategory,
  index,
  focus,
  setFocusedCategoryIndex
}) {
  const ref = useFocus(focus);
  const onClick = useCallback((e, analyticsEvent) => {
    onSelectCategory(category);
    /**
     * When user double clicks on same category, focus on first item.
     */

    if (selectedCategory === category.name) {
      setFocusedCategoryIndex(0);
    } else {
      setFocusedCategoryIndex(index);
    }

    analyticsEvent.fire();
  }, [onSelectCategory, category, index, selectedCategory, setFocusedCategoryIndex]);
  const onFocus = useCallback(() => {
    if (!focus) {
      setFocusedCategoryIndex(index);
    }
  }, [focus, index, setFocusedCategoryIndex]);
  const getTheme = useCallback((currentTheme, themeProps) => {
    const {
      buttonStyles,
      ...rest
    } = currentTheme(themeProps);
    return {
      buttonStyles: { ...buttonStyles,
        textAlign: 'start',
        marginLeft: '2px',
        height: '100%',
        width: '100%',
        color: category.name !== selectedCategory ? N800 : B400,
        ...(category.name === selectedCategory && {
          background: B50
        })
      },
      ...rest
    };
  }, [category.name, selectedCategory]);
  return /*#__PURE__*/React.createElement(ButtonWrapper, null, /*#__PURE__*/React.createElement(Button, {
    appearance: "subtle",
    isSelected: selectedCategory === category.name,
    onClick: onClick,
    onFocus: onFocus,
    theme: getTheme,
    ref: ref
  }, category.title));
}

const ButtonWrapper = styled.div`
  height: ${GRID_SIZE * 4}px;
  margin: 4px 4px 4px 0;

  @media (min-width: ${DEVICE_BREAKPOINT_NUMBERS.medium}px) {
    :not(:last-child) {
      margin-bottom: 0;
    }
  }
`;
const MemoizedCategoryListWithAnalytics = /*#__PURE__*/memo(withAnalyticsContext({
  component: 'CategoryList'
})(CategoryList));
export default MemoizedCategoryListWithAnalytics;