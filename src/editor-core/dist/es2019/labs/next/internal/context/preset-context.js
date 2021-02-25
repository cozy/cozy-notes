import React from 'react';
const PresetContext = /*#__PURE__*/React.createContext([]);
const PresetProvider = PresetContext.Provider;

const usePresetContext = () => React.useContext(PresetContext);

export { PresetProvider, usePresetContext };