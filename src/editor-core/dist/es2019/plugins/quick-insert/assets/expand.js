import React from 'react'
export default function IconExpand({ label = '' }) {
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
          transform: 'translate(7 8)'
        },
        /*#__PURE__*/ React.createElement('path', {
          d: 'M1 0h31v24H1a1 1 0 01-1-1V1a1 1 0 011-1z',
          fill: '#EBECF0'
        }),
        /*#__PURE__*/ React.createElement('path', {
          d: 'M3 7h31v15H3a1 1 0 01-1-1V8a1 1 0 011-1z',
          fill: '#FFF'
        }),
        /*#__PURE__*/ React.createElement('path', {
          d:
            'M5.5 18h14a.5.5 0 110 1h-14a.5.5 0 110-1zm0-3h23a.5.5 0 110 1h-23a.5.5 0 110-1zm0-3h23a.5.5 0 110 1h-23a.5.5 0 110-1zm0-3h23a.5.5 0 110 1h-23a.5.5 0 010-1z',
          fill: '#A5ADBA'
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#2684FF',
          x: 7,
          y: 3,
          width: 18,
          height: 1,
          rx: 0.5
        }),
        /*#__PURE__*/ React.createElement('path', {
          d:
            'M2.646 2.354a.5.5 0 11.708-.708l1.5 1.5a.5.5 0 010 .708l-1.5 1.5a.5.5 0 11-.708-.708L3.793 3.5 2.646 2.354z',
          fill: '#2684FF',
          fillRule: 'nonzero'
        })
      )
    )
  )
}
