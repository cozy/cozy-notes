import { useState, useCallback } from 'react';
import { useAbortableEffect } from '../use-abortable-effect';

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
export function useStateFromPromise(callback, deps, initialValue) {
  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fn = useCallback(callback, deps);
  const [value, setValue] = useState(initialValue);
  useAbortableEffect(signal => {
    Promise.resolve(fn()).then(result => {
      if (signal.aborted) {
        return;
      }

      setValue(result);
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [...deps]);
  return [value, setValue];
}