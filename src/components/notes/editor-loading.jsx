import React from 'react'

import Spinner from 'cozy-ui/react/Spinner'

function EditorLoading() {
  return (
    <div className="u-mv-3">
      <Spinner size="xxlarge" middle />
    </div>
  )
}

export default EditorLoading
