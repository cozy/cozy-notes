import React from 'react'

const HeaderMenu = props => (
  <header className={'page-header-menu ' + (props.className || '')}>
    <div className="page-header-menu--left">{props.left}</div>
    {props.children}
    <div className="page-header-menu--right">{props.right}</div>
  </header>
)

export default HeaderMenu
