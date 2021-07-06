import React from 'react'
export default function IconImages({ label = '' }) {
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
          x1: '46.315%',
          y1: '-31.529%',
          x2: '50%',
          y2: '100%',
          id: 'images-a'
        },
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#FFD500',
          offset: '0%'
        }),
        /*#__PURE__*/ React.createElement('stop', {
          stopColor: '#FFAB00',
          offset: '100%'
        })
      ),
      /*#__PURE__*/ React.createElement(
        'linearGradient',
        {
          x1: '100.699%',
          y1: '50%',
          x2: '-14.52%',
          y2: '50%',
          id: 'images-b'
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
          transform: 'translate(4 9)',
          fillRule: 'nonzero'
        },
        /*#__PURE__*/ React.createElement('rect', {
          fill: 'url(#images-a)',
          width: 32,
          height: 24,
          rx: 1
        }),
        /*#__PURE__*/ React.createElement('path', {
          fill: '#E5E8EC',
          d: 'M4 4h24v16H4z'
        }),
        /*#__PURE__*/ React.createElement('path', {
          fill: '#0049B0',
          d: 'M6.351 18.062l5.594-6.017 5.594 6.017z'
        }),
        /*#__PURE__*/ React.createElement('path', {
          fill: '#0065FF',
          d: 'M9.341 18.062l8.198-8.818 8.198 8.818z'
        }),
        /*#__PURE__*/ React.createElement('path', {
          d:
            'M20.484 14.353c-2.618-1.255-5.104-.564-8.519-1.373C9.625 12.426 6.719 11.135 4 8v11.913h20.294c-.321-2.073-1.26-4.337-3.81-5.56z',
          fill: 'url(#images-b)',
          opacity: 0.37,
          style: {
            mixBlendMode: 'screen'
          }
        }),
        /*#__PURE__*/ React.createElement('ellipse', {
          fill: '#FFAB00',
          cx: 9,
          cy: 9.028,
          rx: 2,
          ry: 2.028
        })
      )
    )
  )
}
