import { CustomAutoformatState, CustomAutoformatAction } from './types';
declare type Reducer<ActionType> = (state: CustomAutoformatState, action: ActionType) => CustomAutoformatState;
declare const reduce: Reducer<CustomAutoformatAction>;
export default reduce;
