import React from 'react';
import { EditorPlugin } from '../../../../types';
declare const PresetProvider: React.Provider<EditorPlugin[]>;
declare const usePresetContext: () => EditorPlugin[];
export { PresetProvider, usePresetContext };
