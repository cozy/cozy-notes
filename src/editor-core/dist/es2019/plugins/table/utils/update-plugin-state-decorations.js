import { getDecorations } from '../pm-plugins/decorations/plugin';
import { updateDecorations } from './decoration';
export const updatePluginStateDecorations = (state, decorations, key) => updateDecorations(state.doc, getDecorations(state), decorations, key);