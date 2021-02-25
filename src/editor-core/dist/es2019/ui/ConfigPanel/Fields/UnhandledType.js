import React, { useEffect } from 'react';
import { HelperMessage } from '@atlaskit/form';
export default function ({
  errorMessage
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(errorMessage);
  }, [errorMessage]);
  return /*#__PURE__*/React.createElement(HelperMessage, null, errorMessage);
}