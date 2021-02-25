import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import rafSchedule from 'raf-schd';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import ChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/hipchat/chevron-up';
import MatchCaseIcon from '@atlaskit/icon/glyph/emoji/keyboard';
import Textfield from '@atlaskit/textfield';
import { SectionWrapper, Count } from './styles';
import { TRIGGER_METHOD } from '../../analytics/types';
import { FindReplaceTooltipButton } from './FindReplaceTooltipButton';
const messages = defineMessages({
  find: {
    id: 'fabric.editor.find',
    defaultMessage: 'Find',
    description: 'The word or phrase to search for on the document'
  },
  matchCase: {
    id: 'fabric.editor.matchCase',
    defaultMessage: 'Match case',
    description: 'Toggle whether should also match case when searching for text'
  },
  findNext: {
    id: 'fabric.editor.findNext',
    defaultMessage: 'Find next',
    description: 'Locate the next occurrence of the word or phrase that was searched for'
  },
  findPrevious: {
    id: 'fabric.editor.findPrevious',
    defaultMessage: 'Find previous',
    description: 'Locate the previous occurrence of the word or phrase that was searched for'
  },
  closeFindReplaceDialog: {
    id: 'fabric.editor.closeFindReplaceDialog',
    defaultMessage: 'Close',
    description: 'Cancel search and close the "Find and Replace" dialog'
  },
  noResultsFound: {
    id: 'fabric.editor.noResultsFound',
    defaultMessage: 'No results',
    description: 'No matches were found for the word or phrase that was searched for'
  },
  resultsCount: {
    id: 'fabric.editor.resultsCount',
    description: 'Text for selected search match position and total results count',
    defaultMessage: '{selectedMatchPosition} of {totalResultsCount}'
  }
});

class Find extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      findText: '',
      isComposing: false
    });

    _defineProperty(this, "findTextfieldRef", /*#__PURE__*/React.createRef());

    _defineProperty(this, "skipWhileComposing", fn => {
      if (this.state.isComposing) {
        return;
      }

      fn();
    });

    _defineProperty(this, "focusFindTextfield", () => {
      if (this.findTextfieldRef.current) {
        this.findTextfieldRef.current.select();
      }
    });

    _defineProperty(this, "updateFindTextfieldValue", value => {
      this.setState({
        findText: value,
        isComposing: false
      });

      if (this.findTextfieldRef.current) {
        this.findTextfieldRef.current.value = value;
      }

      this.updateFindValue(value);
    });

    _defineProperty(this, "handleFindChange", event => this.skipWhileComposing(() => {
      this.updateFindValue(event.target.value);
    }));

    _defineProperty(this, "updateFindValue", rafSchedule(value => {
      this.setState({
        findText: value
      });
      this.props.onFind(value);
    }));

    _defineProperty(this, "handleFindKeyDown", event => this.skipWhileComposing(() => {
      if (event.key === 'Enter') {
        if (event.shiftKey) {
          this.props.onFindPrev({
            triggerMethod: TRIGGER_METHOD.KEYBOARD
          });
        } else {
          this.props.onFindNext({
            triggerMethod: TRIGGER_METHOD.KEYBOARD
          });
        }
      } else if (event.key === 'ArrowDown') {
        // we want to move focus between find & replace texfields when user hits up/down arrows
        this.props.onArrowDown();
      }
    }));

    _defineProperty(this, "handleFindFocus", () => {
      this.props.onFocusElementRefSet(this.findTextfieldRef);
    });

    _defineProperty(this, "handleFindNextClick", ref => this.skipWhileComposing(() => {
      this.props.onFocusElementRefSet(ref);
      this.props.onFindNext({
        triggerMethod: TRIGGER_METHOD.BUTTON
      });
    }));

    _defineProperty(this, "handleFindPrevClick", ref => this.skipWhileComposing(() => {
      this.props.onFocusElementRefSet(ref);
      this.props.onFindPrev({
        triggerMethod: TRIGGER_METHOD.BUTTON
      });
    }));

    _defineProperty(this, "handleCompositionStart", () => {
      this.setState({
        isComposing: true
      });
    });

    _defineProperty(this, "handleCompositionEnd", event => {
      this.setState({
        isComposing: false
      }); // type for React.CompositionEvent doesn't set type for target correctly

      this.updateFindValue(event.target.value);
    });

    _defineProperty(this, "clearSearch", () => {
      this.props.onCancel({
        triggerMethod: TRIGGER_METHOD.BUTTON
      });
    });

    _defineProperty(this, "handleMatchCaseClick", ref => {
      if (this.props.allowMatchCase && this.props.onToggleMatchCase) {
        this.props.onFocusElementRefSet(ref);
        this.props.onToggleMatchCase();
        this.props.onFind(this.state.findText);
      }
    });

    const {
      findText,
      intl: {
        formatMessage
      }
    } = props;

    if (findText) {
      this.updateFindTextfieldValue(findText);
    }

    this.find = formatMessage(messages.find);
    this.closeFindReplaceDialog = formatMessage(messages.closeFindReplaceDialog);
    this.noResultsFound = formatMessage(messages.noResultsFound);
    this.findNext = formatMessage(messages.findNext);
    this.findPrevious = formatMessage(messages.findPrevious);
    this.matchCase = formatMessage(messages.matchCase);
    this.matchCaseIcon = /*#__PURE__*/React.createElement(MatchCaseIcon, {
      label: this.matchCase
    });
    this.findNextIcon = /*#__PURE__*/React.createElement(ChevronDownIcon, {
      label: this.findNext
    });
    this.findPrevIcon = /*#__PURE__*/React.createElement(ChevronUpIcon, {
      label: this.findPrevious
    });
    this.closeIcon = /*#__PURE__*/React.createElement(EditorCloseIcon, {
      label: this.closeFindReplaceDialog
    });
  }

  componentDidMount() {
    this.focusFindTextfield();
    this.props.onFindTextfieldRefSet(this.findTextfieldRef);
  }

  componentWillReceiveProps(newProps) {
    // findText could have been updated from outside this component, for example
    // if a user double clicks to highlight a word and then hits cmd+f
    if (newProps.findText && newProps.findText !== this.state.findText) {
      this.updateFindTextfieldValue(newProps.findText);
    }

    if (newProps.shouldFocus) {
      this.focusFindTextfield();
    }
  }

  render() {
    const {
      findText,
      count,
      allowMatchCase,
      shouldMatchCase,
      intl: {
        formatMessage
      }
    } = this.props;
    const resultsCount = formatMessage(messages.resultsCount, {
      selectedMatchPosition: count.index + 1,
      totalResultsCount: count.total
    });
    return /*#__PURE__*/React.createElement(SectionWrapper, null, /*#__PURE__*/React.createElement(Textfield, {
      name: "find",
      appearance: "none",
      placeholder: this.find,
      defaultValue: findText,
      ref: this.findTextfieldRef,
      autoComplete: "off",
      onChange: this.handleFindChange,
      onKeyDown: this.handleFindKeyDown,
      onBlur: this.props.onFindBlur,
      onFocus: this.handleFindFocus,
      onCompositionStart: this.handleCompositionStart,
      onCompositionEnd: this.handleCompositionEnd
    }), findText && /*#__PURE__*/React.createElement(Count, null, count.total === 0 ? this.noResultsFound : resultsCount), allowMatchCase && /*#__PURE__*/React.createElement(FindReplaceTooltipButton, {
      title: this.matchCase,
      icon: this.matchCaseIcon,
      onClick: this.handleMatchCaseClick,
      isPressed: shouldMatchCase
    }), /*#__PURE__*/React.createElement(FindReplaceTooltipButton, {
      title: this.findNext,
      icon: this.findNextIcon,
      keymapDescription: 'Enter',
      onClick: this.handleFindNextClick,
      disabled: count.total <= 1
    }), /*#__PURE__*/React.createElement(FindReplaceTooltipButton, {
      title: this.findPrevious,
      icon: this.findPrevIcon,
      keymapDescription: 'Shift Enter',
      onClick: this.handleFindPrevClick,
      disabled: count.total <= 1
    }), /*#__PURE__*/React.createElement(FindReplaceTooltipButton, {
      title: this.closeFindReplaceDialog,
      icon: this.closeIcon,
      keymapDescription: 'Escape',
      onClick: this.clearSearch
    }));
  }

}

export default injectIntl(Find);