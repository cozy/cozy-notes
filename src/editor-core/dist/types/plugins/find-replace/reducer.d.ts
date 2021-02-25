import { FindReplacePluginState } from './types';
import { FindReplaceAction } from './actions';
declare const reducer: (getInitialState: () => FindReplacePluginState) => (state: FindReplacePluginState, action: FindReplaceAction) => FindReplacePluginState;
export default reducer;
