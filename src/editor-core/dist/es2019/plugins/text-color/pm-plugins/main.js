import { Plugin, PluginKey } from 'prosemirror-state';
import { textColorPalette, textColorPaletteExperimental } from '../../../ui/ColorPalette/Palettes/textColorPalette';
import { DEFAULT_BORDER_COLOR } from '../../../ui/ColorPalette/Palettes/common';
import { DEFAULT_COLOR, getActiveColor } from '../utils/color';
import { getDisabledState } from '../utils/disabled';
export { DEFAULT_COLOR } from '../utils/color';
export function createInitialPluginState(editorState, pluginConfig) {
  const defaultColor = pluginConfig && pluginConfig.defaultColor || DEFAULT_COLOR;
  const showMoreColorsToggle = pluginConfig && pluginConfig.EXPERIMENTAL_allowMoreTextColors || false;
  const palette = [{
    value: defaultColor.color,
    label: defaultColor.label,
    border: DEFAULT_BORDER_COLOR
  }, ...(showMoreColorsToggle ? textColorPaletteExperimental : textColorPalette)];
  const state = {
    color: getActiveColor(editorState),
    disabled: getDisabledState(editorState),
    palette,
    defaultColor: defaultColor.color
  }; // break up the palette for A/B testing experiment ED-8368

  if (showMoreColorsToggle) {
    // defined palette order: [normal, dark, light] (but normal[0] is default/dark)
    // expanded palette: [dark, normal, light] with normal[0] on the dark row
    const normalRow = palette.slice(0, 7);
    const darkRow = palette.slice(7, 14);
    const lightRow = palette.slice(14);
    const paletteExpanded = darkRow.concat(normalRow).concat(lightRow); // swap default back and slot 7

    const defaultSwatch = paletteExpanded[0];
    paletteExpanded[0] = paletteExpanded[7];
    paletteExpanded[7] = defaultSwatch;
    return { ...state,
      palette: normalRow,
      paletteExpanded
    };
  }

  return state;
}
export let ACTIONS;

(function (ACTIONS) {
  ACTIONS[ACTIONS["RESET_COLOR"] = 0] = "RESET_COLOR";
  ACTIONS[ACTIONS["SET_COLOR"] = 1] = "SET_COLOR";
  ACTIONS[ACTIONS["DISABLE"] = 2] = "DISABLE";
})(ACTIONS || (ACTIONS = {}));

export const pluginKey = new PluginKey('textColorPlugin');
export function createPlugin(dispatch, pluginConfig) {
  return new Plugin({
    key: pluginKey,
    state: {
      init(_config, editorState) {
        return createInitialPluginState(editorState, pluginConfig);
      },

      apply(tr, pluginState, _, newState) {
        const meta = tr.getMeta(pluginKey) || {};
        let nextState;

        switch (meta.action) {
          case ACTIONS.RESET_COLOR:
            nextState = { ...pluginState,
              color: pluginState.defaultColor
            };
            break;

          case ACTIONS.SET_COLOR:
            nextState = { ...pluginState,
              color: meta.color,
              disabled: false
            };
            break;

          case ACTIONS.DISABLE:
            nextState = { ...pluginState,
              disabled: true
            };
            break;

          default:
            nextState = { ...pluginState,
              color: getActiveColor(newState),
              disabled: getDisabledState(newState)
            };
        }

        if (pluginState && pluginState.color !== nextState.color || pluginState && pluginState.disabled !== nextState.disabled) {
          dispatch(pluginKey, nextState);
          return nextState;
        }

        return pluginState;
      }

    }
  });
}