import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { SmartMediaEditor } from '@atlaskit/media-editor';
import { uploadAnnotation, closeMediaEditor } from '../commands/media-editor';
export default class MediaEditor extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onUploadStart", (newFileIdentifier, dimensions) => {
      const {
        state,
        dispatch
      } = this.props.view;
      uploadAnnotation(newFileIdentifier, dimensions)(state, dispatch);
    });

    _defineProperty(this, "onClose", () => {
      const {
        state,
        dispatch
      } = this.props.view;
      closeMediaEditor()(state, dispatch);
    });
  }

  render() {
    const {
      mediaEditorState: {
        editor,
        mediaClientConfig
      }
    } = this.props;

    if (!editor || !mediaClientConfig) {
      return null;
    }

    const {
      identifier
    } = editor;
    return /*#__PURE__*/React.createElement(SmartMediaEditor, {
      identifier: identifier,
      mediaClientConfig: mediaClientConfig,
      onUploadStart: this.onUploadStart,
      onClose: this.onClose
    });
  }

}

_defineProperty(MediaEditor, "displayName", 'MediaEditor');