import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { PureComponent } from 'react';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertMentionQuery } from '../../commands/insert-mention-query';
import { INPUT_METHOD } from '../../../analytics';
export default class ToolbarMention extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleInsertMention", () => {
      if (!this.props.editorView) {
        return false;
      }

      insertMentionQuery(INPUT_METHOD.TOOLBAR)(this.props.editorView.state, this.props.editorView.dispatch);
      return true;
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(ToolbarButton, {
      spacing: "none",
      onClick: this.handleInsertMention,
      disabled: this.props.isDisabled,
      title: "Mention @",
      iconBefore: /*#__PURE__*/React.createElement(MentionIcon, {
        label: "Mention"
      })
    });
  }

}