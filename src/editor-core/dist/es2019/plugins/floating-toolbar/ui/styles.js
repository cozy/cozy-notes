import * as colors from '@atlaskit/theme/colors';
import { hexToRgba } from '@atlaskit/adf-schema';
const background = {
  danger: {
    default: {
      light: 'inherit',
      dark: 'inherit'
    },
    hover: {
      light: colors.N30A,
      dark: colors.N30A
    },
    active: {
      light: hexToRgba(colors.B75, 0.6),
      dark: hexToRgba(colors.B75, 0.6)
    }
  }
};
const color = {
  danger: {
    default: {
      light: colors.N400,
      dark: colors.DN400
    },
    hover: {
      light: colors.R300,
      dark: colors.R300
    },
    active: {
      light: colors.R300,
      dark: colors.R300
    }
  }
};

const getStyles = (property, {
  appearance = 'default',
  state = 'default',
  mode = 'light'
}) => {
  if (!property[appearance] || !property[appearance][state]) {
    return 'initial';
  }

  return property[appearance][state][mode];
};

export const iconOnlySpacing = {
  '&&': {
    padding: '0px',
    '&[href]': {
      padding: '0 2px'
    }
  },
  '& > span': {
    margin: '0px'
  }
};
export const getButtonStyles = props => ({
  background: getStyles(background, props),
  color: getStyles(color, props)
});