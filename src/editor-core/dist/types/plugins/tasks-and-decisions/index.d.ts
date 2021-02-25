import { EditorPlugin } from '../../types';
import { TaskDecisionPluginOptions } from './types';
declare const tasksAndDecisionsPlugin: ({ allowNestedTasks, consumeTabs, useLongPressSelection, }?: TaskDecisionPluginOptions) => EditorPlugin;
export default tasksAndDecisionsPlugin;
