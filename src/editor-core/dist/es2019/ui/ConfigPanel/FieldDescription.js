import React from 'react';
import { HelperMessage } from '@atlaskit/form';

const FieldDescription = function ({
  error,
  description
}) {
  if (error || !description) {
    return null;
  }

  return /*#__PURE__*/React.createElement(HelperMessage, null, description);
};

export default FieldDescription;