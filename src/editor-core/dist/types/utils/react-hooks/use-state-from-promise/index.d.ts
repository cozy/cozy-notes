import React from 'react';
declare type AbortableEffect<T> = () => Promise<T> | undefined;
/**
 * Similar to useState but deals with async values.
 * Simply pass a promise and it will set the state when it resolves. It won't try to set if
 * the component unmounts
 *
 * Note: This hook follows the signature of useEffect so it can be linted if enabled through the
 * `additionalHooks` config.
 *
 * @param callback
 * @param deps
 */
export declare function useStateFromPromise<S>(callback: AbortableEffect<S>, deps: React.DependencyList, initialValue?: S): [S | undefined, React.Dispatch<React.SetStateAction<S | undefined>>];
export {};
