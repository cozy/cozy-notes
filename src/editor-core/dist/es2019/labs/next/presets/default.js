// #region Imports
import React from 'react';
import pastePlugin from '../../../plugins/paste';
import blockTypePlugin from '../../../plugins/block-type';
import clearMarksOnChangeToEmptyDocumentPlugin from '../../../plugins/clear-marks-on-change-to-empty-document';
import hyperlinkPlugin from '../../../plugins/hyperlink';
import textFormattingPlugin from '../../../plugins/text-formatting';
import widthPlugin from '../../../plugins/width';
import unsupportedContentPlugin from '../../../plugins/unsupported-content';
import basePlugin from '../../../plugins/base';
import editorDisabledPlugin from '../../../plugins/editor-disabled';
import typeAheadPlugin from '../../../plugins/type-ahead';
import submitEditorPlugin from '../../../plugins/submit-editor';
import fakeTextCursorPlugin from '../../../plugins/fake-text-cursor';
import featureFlagsContextPlugin from '../../../plugins/feature-flags-context';
import floatingToolbarPlugin from '../../../plugins/floating-toolbar';
import { PresetProvider } from '../Editor';
import { Preset } from './preset';
import clipboardPlugin from '../../../plugins/clipboard';
import placeholderPlugin from '../../../plugins/placeholder';
import annotationPlugin from '../../../plugins/annotation';
import quickInsertPlugin from '../../../plugins/quick-insert';
import selectionPlugin from '../../../plugins/selection';
import codeBlockPlugin from '../../../plugins/code-block';
export function createDefaultPreset(options) {
  const preset = new Preset();
  preset.add([pastePlugin, options.paste]);
  preset.add(clipboardPlugin);
  preset.add([basePlugin, options.base]);
  preset.add([blockTypePlugin, options.blockType]);
  preset.add([placeholderPlugin, options.placeholder]);
  preset.add(clearMarksOnChangeToEmptyDocumentPlugin);

  if (options.annotationProviders) {
    preset.add([annotationPlugin, options.annotationProviders]);
  }

  preset.add([hyperlinkPlugin, options.cardOptions]);
  preset.add([textFormattingPlugin, options.textFormatting]);
  preset.add(widthPlugin);
  preset.add([quickInsertPlugin, options.quickInsert]);
  preset.add(typeAheadPlugin);
  preset.add(unsupportedContentPlugin);
  preset.add(editorDisabledPlugin);
  preset.add([submitEditorPlugin, options.submitEditor]);
  preset.add(fakeTextCursorPlugin);
  preset.add(floatingToolbarPlugin);
  preset.add([featureFlagsContextPlugin, options.featureFlags || {}]);
  preset.add([selectionPlugin, options.selection]);
  preset.add([codeBlockPlugin, options.codeBlock]);
  return preset;
}
export function useDefaultPreset(props) {
  const preset = createDefaultPreset(props);
  return [preset];
}
export function EditorPresetDefault(props) {
  const [preset] = useDefaultPreset(props);
  const plugins = preset.getEditorPlugins();
  return /*#__PURE__*/React.createElement(PresetProvider, {
    value: plugins
  }, props.children);
}