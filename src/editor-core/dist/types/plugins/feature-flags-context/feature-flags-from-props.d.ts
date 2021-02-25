import { EditorProps } from '../../types';
import { FeatureFlags } from './types';
/**
 * Transforms EditorProps to an FeatureFlags object,
 * which is used by both current and archv3 editors.
 */
export declare function createFeatureFlagsFromProps(props: EditorProps): FeatureFlags;
/**
 * Transforms FeatureFlags to a type safe string array of the enabled feature flags.
 *
 * Useful for analytics and analysis purposes.
 */
export declare function getEnabledFeatureFlagKeys(featureFlags: FeatureFlags): ("newInsertionBehaviour" | "interactiveExpand" | "placeholderBracketHint" | "placeholderHints" | "moreTextColors" | "findReplace" | "findReplaceMatchCase" | "extensionLocalIdGeneration" | "keyboardAccessibleDatepicker" | "addColumnWithCustomStep" | "predictableLists")[];
