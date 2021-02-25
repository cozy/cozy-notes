import React from 'react';
import chromatism from 'chromatism';
import Color from './Color';
import { ColorPaletteWrapper } from './styles';
import { injectIntl } from 'react-intl';
import { N0, N500 } from '@atlaskit/theme/colors';

/**
 * For a given color pick the color from a list of colors with
 * the highest contrast
 *
 * @param color color string, suppports HEX, RGB, RGBA etc.
 * @return Highest contrast color in pool
 */
export function getContrastColor(color, pool) {
  return pool.sort((a, b) => chromatism.difference(b, color) - chromatism.difference(a, color))[0];
}

const ColorPalette = props => {
  const {
    palette,
    cols = 7,
    onClick,
    selectedColor,
    className,
    intl: {
      formatMessage
    }
  } = props;
  const colorsPerRow = React.useMemo(() => {
    return palette.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / cols);
      resultArray[chunkIndex] = resultArray[chunkIndex] || []; // start a new chunk

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
  }, [palette, cols]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, colorsPerRow.map(row => /*#__PURE__*/React.createElement(ColorPaletteWrapper, {
    className: className,
    key: `row-first-color-${row[0].value}`
  }, row.map(({
    value,
    label,
    border,
    message
  }) => /*#__PURE__*/React.createElement(Color, {
    key: value,
    value: value,
    borderColor: border,
    label: message ? formatMessage(message) : label,
    onClick: onClick,
    isSelected: value === selectedColor,
    checkMarkColor: getContrastColor(value, [N0, N500])
  })))));
};

export default injectIntl(ColorPalette);