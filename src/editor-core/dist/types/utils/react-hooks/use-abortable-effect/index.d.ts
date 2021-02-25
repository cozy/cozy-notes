import React from 'react';
declare type AbortableEffectWithCancel = (signal: AbortSignal) => () => void;
declare type AbortableEffect = (signal: AbortSignal) => void;
/**
 * Similar to useEffect but integrated with the AbortController to make it useful for async operations.
 * On unmount, the abort function will be called and the signal will be passed down to the function so
 * we get the chance to cancel any operation we want.
 *
 * Note: This hook follows the signature of useEffect so it can be linted if enabled through the
 * `additionalHooks` config.
 *
 * @param callback
 * @param deps
 */
export declare function useAbortableEffect(callback: AbortableEffectWithCancel | AbortableEffect, deps: React.DependencyList): void;
export {};
