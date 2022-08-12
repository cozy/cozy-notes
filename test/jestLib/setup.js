import '@testing-library/jest-dom'

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}

global.cozy = {
  bar: {
    BarLeft: () => null,
    BarRight: ({ children }) => children,
    BarCenter: () => null,
    setTheme: () => null
  }
}
