import React from 'react'
export default function IconDate({ label = '' }) {
  return /*#__PURE__*/ React.createElement(
    'svg',
    {
      'aria-label': label,
      width: 40,
      height: 40
    },
    /*#__PURE__*/ React.createElement(
      'defs',
      null,
      /*#__PURE__*/ React.createElement(
        'linearGradient',
        {
          x1: '100.699%',
          y1: '50%',
          x2: '-14.52%',
          y2: '50%',
          id: 'date-a'
        },
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#FAFBFC',
          offset: '0%'
        }),
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#F4F6F8',
          stopOpacity: 0.859,
          offset: '12.52%'
        }),
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#E3E6EA',
          stopOpacity: 0.402,
          offset: '54.65%'
        }),
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#D7DCE1',
          stopOpacity: 0.113,
          offset: '83.66%'
        }),
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#D3D8DE',
          stopOpacity: 0,
          offset: '97.03%'
        })
      ),
      /*#__PURE__*/ React.createElement(
        'linearGradient',
        {
          x1: '50%',
          y1: '4.543%',
          x2: '50%',
          y2: '100%',
          id: 'date-b'
        },
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#FF7043',
          offset: '0%'
        }),
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#FF5630',
          offset: '100%'
        })
      )
    ),
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
          transform: 'translate(8 7)'
        },
        /*#__PURE__*/ React.createElement('path', {
          d: 'M0 8h24v14a2 2 0 01-2 2H2a2 2 0 01-2-2V8z',
          fill: '#EBECF0'
        }),
        /*#__PURE__*/ React.createElement('path', {
          d:
            'M18.109 17.42c-2.877-1.466-5.608-.66-9.359-1.604C6.18 15.17 2.987 13.661 0 10v13.913h22.294c-.353-2.421-1.384-5.065-4.185-6.493z',
          fill: 'url(#date-a)',
          fillRule: 'nonzero',
          opacity: 0.37,
          style: {
            mixBlendMode: 'screen'
          }
        }),
        /*#__PURE__*/ React.createElement('path', {
          d: 'M1 2h22a1 1 0 011 1v7H0V3a1 1 0 011-1z',
          fill: 'url(#date-b)'
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#0065FF',
          x: 5,
          width: 2,
          height: 6,
          rx: 1
        }),
        /*#__PURE__*/ React.createElement('rect', {
          fill: '#0065FF',
          x: 17,
          width: 2,
          height: 6,
          rx: 1
        }),
        /*#__PURE__*/ React.createElement('path', {
          fill: '#C1C7D0',
          d:
            'M4 13h4v3H4zm0 5h4v3H4zm6 0h4v3h-4zm0-5h4v3h-4zm6 5h4v3h-4zm0-5h4v3h-4z'
        })
      )
    )
  )
}
