import { useEffect } from 'react'

import {
  applyFixToElement,
  handleMutation,
  setupEventListeners,
  tearDownEventListeners,
  TOOLBAR_SELECTOR
} from 'lib/patches/fixedToBottomIos'

/**
 * Custom hook that fixes an element to the bottom of the screen on iOS devices.
 * Listens for the specified element and ensures it's fixed to the viewport bottom.
 * Only activated on iOS devices.
 */
export const useFixedToBottomOnIOS = (): void => {
  useEffect(() => {
    // Only proceed if on iOS devices
    if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) return

    let observer: MutationObserver | undefined

    // Check if the element is already present and set up positions, in practice it's unlikely to be present on initial render
    // If not present, set up a mutation observer to handle future additions
    const existingElement = document.querySelector<HTMLElement>(
      TOOLBAR_SELECTOR
    )

    if (existingElement) {
      applyFixToElement(existingElement)
      setupEventListeners(existingElement)
    } else {
      observer = new MutationObserver(handleMutation)
      observer.observe(document.body, { childList: true, subtree: true })
    }

    // Cleanup function
    return () => {
      observer?.disconnect()

      if (existingElement) tearDownEventListeners(existingElement)
    }
  }, [])
}
