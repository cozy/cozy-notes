import React from 'react';
import { PureComponent } from 'react';
import { EditorView } from 'prosemirror-view';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import ToolbarButton, { TOOLBAR_BUTTON } from '../../../../ui/ToolbarButton';
import { insertMentionQuery } from '../../commands/insert-mention-query';
import { INPUT_METHOD } from '../../../analytics';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
  testId?: string;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMention extends PureComponent<Props> {
  render() {
    return (
      <ToolbarButton
        testId={this.props.testId}
        buttonId={TOOLBAR_BUTTON.MENTION}
        spacing="none"
        onClick={this.handleInsertMention}
        disabled={this.props.isDisabled}
        title="Mention @"
        iconBefore={<MentionIcon label="Mention" />}
      />
    );
  }

  private handleInsertMention = (): boolean => {
    if (!this.props.editorView) {
      return false;
    }
    insertMentionQuery(INPUT_METHOD.TOOLBAR)(
      this.props.editorView.state,
      this.props.editorView.dispatch,
    );
    return true;
  };
}
