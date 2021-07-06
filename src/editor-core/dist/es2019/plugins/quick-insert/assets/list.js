import React from 'react'
export default function IconList({ label = '' }) {
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
      /*#__PURE__*/ React.createElement(
        'g',
        {
          transform: 'translate(8 10)'
        },
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#6C798F',
          width: 4,
          height: 4,
          rx: 2
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#C1C7D0',
          x: 7,
          y: 9,
          width: 17,
          height: 2,
          rx: 1
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#C1C7D0',
          x: 7,
          y: 1,
          width: 17,
          height: 2,
          rx: 1
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#C1C7D0',
          x: 7,
          y: 17,
          width: 17,
          height: 2,
          rx: 1
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#6C798F',
          y: 8,
          width: 4,
          height: 4,
          rx: 2
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#6C798F',
          y: 16,
          width: 4,
          height: 4,
          rx: 2
        })
      )
    )
  )
}
