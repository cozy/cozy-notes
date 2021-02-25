import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { findDateSegmentByPosition, adjustDate, isDatePossiblyValid } from '../../utils/internal';
import { parseDateType, formatDateType } from '../../utils/formatParse';
import { EVENT_TYPE, ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from '../../../analytics/types/enums';
import TextField from '@atlaskit/textfield';
import { ErrorMessage } from '@atlaskit/form';
const DateTextFieldWrapper = styled.div`
  padding: 22px;
  padding-bottom: 12px;
`;
const messages = defineMessages({
  invalidDateError: {
    id: 'fabric.editor.invalidDateError',
    defaultMessage: 'Enter a valid date',
    description: 'Error message when the date typed in is invalid, requesting they inputs a new date'
  }
});

class DatePickerInput extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "focusInput", () => {
      if (!this.inputRef) {
        return;
      } // Defer to prevent editor scrolling to top (See FS-3227, also ED-2992)


      this.autofocusTimeout = setTimeout(() => {
        this.inputRef.focus();
      });
    });

    _defineProperty(this, "selectInput", () => {
      if (!this.inputRef) {
        return;
      } // Defer to prevent editor scrolling to top (See FS-3227, also ED-2992)


      this.autoSelectAllTimeout = setTimeout(() => {
        this.inputRef.select();
      });
    });

    _defineProperty(this, "handleInputRef", ref => {
      const {
        autoFocus,
        autoSelectAll
      } = this.props;

      if (ref) {
        this.inputRef = ref;
      }

      if (ref && autoFocus) {
        this.focusInput();
      }

      if (autoSelectAll) {
        this.selectInput();
      }
    });

    _defineProperty(this, "handleChange", evt => {
      const textFieldValue = evt.target.value;
      const {
        locale,
        dispatchAnalyticsEvent
      } = this.props;
      const newDate = parseDateType(textFieldValue, locale);

      if (newDate !== undefined && newDate !== null) {
        this.setState({
          inputText: textFieldValue
        });
        this.props.onNewDate(newDate);

        if (dispatchAnalyticsEvent) {
          dispatchAnalyticsEvent({
            eventType: EVENT_TYPE.TRACK,
            action: ACTION.TYPING_FINISHED,
            actionSubject: ACTION_SUBJECT.DATE
          });
        }
      } else {
        // if invalid, just update state text (to rerender textfield)
        this.setState({
          inputText: textFieldValue
        });
      }
    });

    _defineProperty(this, "handleKeyPress", event => {
      const {
        locale,
        dispatchAnalyticsEvent
      } = this.props;
      const textFieldValue = event.target.value; // Fire event on every keypress (textfield not necessarily empty)

      if (dispatchAnalyticsEvent && event.key !== 'Enter' && event.key !== 'Backspace') {
        dispatchAnalyticsEvent({
          eventType: EVENT_TYPE.TRACK,
          action: ACTION.TYPING_STARTED,
          actionSubject: ACTION_SUBJECT.DATE
        });
      }

      if (event.key !== 'Enter') {
        return;
      }

      if (textFieldValue === '') {
        this.props.onEmptySubmit();
        return;
      }

      const newDate = parseDateType(textFieldValue, locale);
      this.props.onSubmitDate(newDate);
    });

    _defineProperty(this, "handleKeyDown", event => {
      const dateString = event.target.value;
      const {
        locale
      } = this.props;
      let adjustment;

      if (event.key === 'ArrowUp') {
        adjustment = 1;
      } else if (event.key === 'ArrowDown') {
        adjustment = -1;
      }

      if (adjustment === undefined) {
        return;
      }

      const {
        dispatchAnalyticsEvent
      } = this.props;
      const cursorPos = this.inputRef.selectionStart;
      const activeSegment = findDateSegmentByPosition(cursorPos, dateString, locale);

      if (activeSegment === undefined) {
        return;
      }

      let dateSegment;

      switch (activeSegment) {
        case 'day':
          dateSegment = ACTION_SUBJECT_ID.DATE_DAY;
          break;

        case 'month':
          dateSegment = ACTION_SUBJECT_ID.DATE_MONTH;
          break;

        default:
          dateSegment = ACTION_SUBJECT_ID.DATE_YEAR;
      }

      if (dispatchAnalyticsEvent) {
        dispatchAnalyticsEvent({
          eventType: EVENT_TYPE.TRACK,
          action: adjustment > 0 ? ACTION.INCREMENTED : ACTION.DECREMENTED,
          actionSubject: ACTION_SUBJECT.DATE_SEGMENT,
          attributes: {
            dateSegment
          }
        });
      }

      const oldDateType = parseDateType(dateString, locale);

      if (oldDateType === undefined || oldDateType === null) {
        return;
      }

      const newDateType = adjustDate(oldDateType, activeSegment, adjustment);
      this.setState({
        inputText: formatDateType(newDateType, locale)
      });
      this.props.onNewDate(newDateType);
      this.setInputSelectionPos = Math.min(cursorPos, dateString.length);
      event.preventDefault();
    });

    const {
      date
    } = props;
    this.setInputSelectionPos = undefined;
    const inputText = formatDateType(date, this.props.locale);
    this.state = {
      inputText
    };
  }

  render() {
    const {
      locale,
      intl: {
        formatMessage
      }
    } = this.props;
    const {
      inputText
    } = this.state;
    const possiblyValid = isDatePossiblyValid(inputText);
    const attemptedDateParse = parseDateType(inputText, locale); // Don't display an error for an empty input.

    const displayError = (attemptedDateParse === null || !possiblyValid) && inputText !== '';
    return /*#__PURE__*/React.createElement(DateTextFieldWrapper, null, /*#__PURE__*/React.createElement(TextField, {
      name: "datetextfield",
      value: inputText,
      ref: this.handleInputRef,
      onChange: this.handleChange,
      onKeyPress: this.handleKeyPress,
      onKeyDown: this.handleKeyDown,
      spellCheck: false,
      autoComplete: "off",
      isInvalid: displayError
    }), displayError && /*#__PURE__*/React.createElement(ErrorMessage, null, formatMessage(messages.invalidDateError)));
  }

  componentDidUpdate() {
    const setInputSelectionPos = this.setInputSelectionPos;

    if (setInputSelectionPos !== undefined) {
      this.inputRef.setSelectionRange(setInputSelectionPos, setInputSelectionPos);
      this.setInputSelectionPos = undefined;
    }

    if (this.inputRef && this.props.autoFocus) {
      // TODO: Check if input already has focus
      this.focusInput();
    } // Don't select all text here - would seleect text on each keystroke

  }
  /**
   * Focus the input textfield
   */


  componentWillUnmount() {
    if (this.autofocusTimeout !== undefined) {
      clearTimeout(this.autofocusTimeout);
    }

    if (this.autoSelectAllTimeout !== undefined) {
      clearTimeout(this.autoSelectAllTimeout);
    }
  }

}

export default injectIntl(DatePickerInput);