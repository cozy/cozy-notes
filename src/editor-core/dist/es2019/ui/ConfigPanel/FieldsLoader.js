import React, { useState } from 'react';
import { useStateFromPromise } from '../../utils/react-hooks/use-state-from-promise';
import ConfigPanel from './ConfigPanel';

const getFieldsDefinitionFn = (extensionManifest, nodeKey) => {
  if (extensionManifest && extensionManifest.modules.nodes && extensionManifest.modules.nodes[nodeKey] && extensionManifest.modules.nodes[nodeKey].getFieldsDefinition) {
    return extensionManifest.modules.nodes[nodeKey].getFieldsDefinition;
  }
}; // having the default value in the props instead of a reference will cause excessive rerenders


const defaultEmptyObject = {};
export default function FieldsLoader({
  extensionType,
  extensionKey,
  nodeKey,
  extensionProvider,
  extensionParameters = defaultEmptyObject,
  parameters = defaultEmptyObject,
  autoSave,
  autoSaveTrigger,
  closeOnEsc,
  showHeader,
  onChange,
  onCancel
}) {
  const [extensionManifest] = useStateFromPromise(() => extensionProvider.getExtension(extensionType, extensionKey), [extensionProvider, extensionType, extensionKey]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fields] = useStateFromPromise(function getExtensionFields() {
    const fn = getFieldsDefinitionFn(extensionManifest, nodeKey);

    if (typeof fn === 'function') {
      return fn(extensionParameters).catch(err => {
        if (err && typeof err.message === 'string') {
          setErrorMessage(err.message);
        }

        return undefined;
      });
    }
  }, [extensionManifest, nodeKey, extensionParameters]);
  return /*#__PURE__*/React.createElement(ConfigPanel, {
    extensionManifest: extensionManifest,
    isLoading: !extensionManifest || errorMessage === null && !fields,
    fields: fields,
    parameters: parameters,
    autoSave: autoSave,
    autoSaveTrigger: autoSaveTrigger,
    closeOnEsc: closeOnEsc,
    showHeader: showHeader,
    onChange: onChange,
    onCancel: onCancel,
    errorMessage: errorMessage
  });
}