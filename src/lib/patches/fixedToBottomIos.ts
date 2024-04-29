export const TOOLBAR_SELECTOR = '[data-testid="ak-editor-main-toolbar"]'

/**
 * Applies a fix to the specified element to ensure it stays fixed to the bottom of the viewport.
 * @param element - The element to apply the fix to.
 * @returns A function that can be called to remove the applied fix.
 */
export const applyFixToElement = (element: HTMLElement): (() => void) => {
  const adjustFixedPos = createAdjustmentFunction(element)
  enableAbsolutePositioning(element, adjustFixedPos)

  return () => {
    document.removeEventListener('scroll', adjustFixedPos)
    window.visualViewport.removeEventListener('resize', adjustFixedPos)
  }
}

/**
 * Creates an adjustment function that fixes an element to the bottom of the viewport.
 * The adjustment function adjusts the position of the element based on the viewport height and scroll position.
 *
 * @param element - The HTML element to be fixed to the bottom of the viewport.
 * @returns A function that adjusts the position of the element.
 */
export const createAdjustmentFunction = (element: HTMLElement) => (): void => {
  const viewport = window.visualViewport
  const elementHeight = element.offsetHeight
  const elementBottom =
    viewport.height - elementHeight + document.documentElement.scrollTop

  element.style.top = `${elementBottom}px`
}

/**
 * Enables absolute positioning for the specified element and adjusts its position.
 * This function is typically used to fix elements to the bottom of the screen on iOS devices.
 *
 * @param element - The HTML element to enable absolute positioning for.
 * @param adjustPosition - A callback function that adjusts the position of the element.
 */
export const enableAbsolutePositioning = (
  element: HTMLElement,
  adjustPosition: () => void
): void => {
  element.style.position = 'absolute'
  element.style.bottom = 'auto'
  element.style.marginTop = '-5rem' // Offset the element to avoid the keyboard
  adjustPosition()
  document.addEventListener('scroll', adjustPosition, { passive: true })
  window.visualViewport.addEventListener('resize', adjustPosition, {
    passive: true
  })
}

/**
 * Sets up event listeners for the given element to adjust its position when scrolling or resizing the window.
 * @param element - The HTML element to adjust.
 */
export const setupEventListeners = (element: HTMLElement): void => {
  const adjustFunction = createAdjustmentFunction(element)
  document.addEventListener('scroll', adjustFunction, { passive: true })
  window.visualViewport.addEventListener('resize', adjustFunction, {
    passive: true
  })
}

/**
 * Removes event listeners for scroll and resize events.
 * @param element - The HTML element to remove event listeners from.
 */
export const tearDownEventListeners = (element: HTMLElement): void => {
  const adjustFunction = createAdjustmentFunction(element)
  document.removeEventListener('scroll', adjustFunction)
  window.visualViewport.removeEventListener('resize', adjustFunction)
}

/**
 * Handles mutations in the DOM and applies fixes to the toolbar element.
 * @param mutations - An array of MutationRecord objects representing DOM mutations.
 * @param observer - The MutationObserver instance used to observe DOM mutations.
 */
export const handleMutation = (
  mutations: MutationRecord[],
  observer: MutationObserver
): void => {
  mutations.forEach(mutation => {
    Array.from(mutation.addedNodes).forEach(node => {
      if (node.nodeType === 1) {
        // Ensuring node is an Element
        const element = node as HTMLElement
        const elementIsToolbar =
          element.matches(TOOLBAR_SELECTOR) ||
          element.querySelector(TOOLBAR_SELECTOR)

        if (elementIsToolbar) {
          observer.disconnect() // Disconnect observer to avoid infinite loop

          const targetElement = element.matches(TOOLBAR_SELECTOR)
            ? element
            : element.querySelector<HTMLElement>(TOOLBAR_SELECTOR)

          if (targetElement) {
            applyFixToElement(targetElement) // Adjust toolbar position immediately
            setupEventListeners(targetElement) // Set up event listeners for future position adjustments
          }

          return // Exit after applying fix to the first matching element (which should be the toolbar)
        }
      }
    })
  })
}
