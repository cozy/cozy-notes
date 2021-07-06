import React from 'react'
export default function IconPanelNote({ label = '' }) {
  return /*#__PURE__*/ React.createElement(
    'svg',
    {
      'aria-label': label,
      width: 40,
      height: 40
    },
    /*#__PURE__*/ React.createElement(
      'g',
      {
        fill: 'none',
        fillRule: 'evenodd'
      },
      /*#__PURE__*/ React.createElement('path', {
        fill: '#FFF',
        d: 'M0 0h40v40H0z'
      }),
      /*#__PURE__*/ React.createElement('rect', {
        fill: '#EAE6FF',
        x: 8,
        y: 12,
        width: 32,
        height: 16,
        rx: 1
      }),
      /*#__PURE__*/ React.createElement('path', {
        d:
          'M13 16h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6a1 1 0 011-1zm1 2a.5.5 0 100 1h2a.5.5 0 100-1h-2zm0 2a.5.5 0 100 1h1a.5.5 0 100-1h-1z',
        fill: '#403294'
      })
    )
  )
}
