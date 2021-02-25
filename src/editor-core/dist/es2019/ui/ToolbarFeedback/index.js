import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Spinner from '@atlaskit/spinner';
import { Popup } from '@atlaskit/editor-common';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import ToolbarButton from '../ToolbarButton';
import withOuterListeners from '../with-outer-listeners';
import { Wrapper, ButtonContent, ConfirmationPopup, ConfirmationText, ConfirmationHeader, ConfirmationImg } from './styles';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE, ACTION_SUBJECT_ID } from '../../plugins/analytics';
import { createDispatch } from '../../event-dispatcher';
import { openFeedbackDialog } from '../../plugins/feedback-dialog';
import deprecationWarnings from '../../utils/deprecation-warnings';
import pickBy from '../../utils/pick-by';
import { analyticsEventKey } from '../../plugins/analytics/consts';
const PopupWithOutsideListeners = withOuterListeners(Popup);
const POPUP_HEIGHT = 388;
const POPUP_WIDTH = 280;
const EDITOR_IMAGE_URL = 'https://confluence.atlassian.com/download/attachments/945114421/editorillustration@2x.png?api=v2';
const deprecations = [{
  property: 'packageVersion',
  description: 'To pass package version use feedbackInfo property – <Editor feedbackInfo={{ packageVersion }} />',
  type: 'removed'
}, {
  property: 'packageName',
  description: 'To pass package name use feedbackInfo property – <Editor feedbackInfo={{ packageName }} />',
  type: 'removed'
}, {
  property: 'labels',
  description: 'To pass feedback labels use feedbackInfo property – <Editor feedbackInfo={{ labels }} />',
  type: 'removed'
}];

const isNullOrUndefined = attr => attr === null || attr === undefined;

export default class ToolbarFeedback extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      jiraIssueCollectorScriptLoading: false,
      showOptOutOption: false
    });

    _defineProperty(this, "handleRef", ref => {
      if (ref) {
        this.setState({
          target: ReactDOM.findDOMNode(ref || null)
        });
      }
    });

    _defineProperty(this, "getFeedbackInfo", () => {
      const isFeedbackInfoAttr = attr => ['product', 'packageVersion', 'packageName', 'labels'].indexOf(attr) >= 0;

      return pickBy((key, value) => isFeedbackInfoAttr(key) && !isNullOrUndefined(value), this.props);
    });

    _defineProperty(this, "collectFeedback", () => {
      if (this.props.product === 'bitbucket') {
        this.setState({
          showOptOutOption: true
        });
      } else {
        this.openFeedbackPopup();
      }
    });

    _defineProperty(this, "toggleShowOptOutOption", () => {
      this.setState({
        showOptOutOption: !this.state.showOptOutOption
      });
    });

    _defineProperty(this, "openJiraIssueCollector", async () => {
      this.setState({
        jiraIssueCollectorScriptLoading: true,
        showOptOutOption: false
      });
      await openFeedbackDialog(this.getFeedbackInfo());
      this.setState({
        jiraIssueCollectorScriptLoading: false
      });
    });

    _defineProperty(this, "openFeedbackPopup", () => {
      const dispatch = createDispatch(this.context.editorActions.eventDispatcher);
      dispatch(analyticsEventKey, {
        payload: {
          action: ACTION.CLICKED,
          actionSubject: ACTION_SUBJECT.BUTTON,
          actionSubjectId: ACTION_SUBJECT_ID.BUTTON_FEEDBACK,
          eventType: EVENT_TYPE.UI
        }
      });
      this.openJiraIssueCollector();
      return true;
    });

    _defineProperty(this, "openLearnMorePage", () => {
      window.open('https://confluence.atlassian.com/x/NU1VO', '_blank');
      this.toggleShowOptOutOption();
    });

    _defineProperty(this, "hasJquery", () => {
      return typeof window.jQuery !== 'undefined';
    });

    deprecationWarnings(ToolbarFeedback.name, props, deprecations);
  }

  render() {
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement
    } = this.props;
    const iconBefore = this.state.jiraIssueCollectorScriptLoading ? /*#__PURE__*/React.createElement(Spinner, null) : undefined; // JIRA issue collector script is using jQuery internally

    return this.hasJquery() ? /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(ToolbarButton, {
      ref: this.handleRef,
      iconBefore: iconBefore,
      onClick: this.collectFeedback,
      selected: false,
      spacing: "compact"
    }, /*#__PURE__*/React.createElement(ButtonContent, null, "Feedback")), this.state.showOptOutOption && /*#__PURE__*/React.createElement(PopupWithOutsideListeners, {
      target: this.state.target,
      mountTo: popupsMountPoint,
      boundariesElement: popupsBoundariesElement,
      scrollableElement: popupsScrollableElement,
      fitHeight: POPUP_HEIGHT,
      fitWidth: POPUP_WIDTH,
      handleClickOutside: this.toggleShowOptOutOption,
      handleEscapeKeydown: this.toggleShowOptOutOption
    }, /*#__PURE__*/React.createElement(ConfirmationPopup, null, /*#__PURE__*/React.createElement(ConfirmationHeader, null, /*#__PURE__*/React.createElement(ConfirmationImg, {
      src: EDITOR_IMAGE_URL
    })), /*#__PURE__*/React.createElement(ConfirmationText, null, /*#__PURE__*/React.createElement("div", null, "We are rolling out a new editing experience across Atlassian products. Help us improve by providing feedback."), /*#__PURE__*/React.createElement("div", null, "You can opt-out for now by turning off the \"Atlassian Editor\" feature on the Labs page in Bitbucket settings."), /*#__PURE__*/React.createElement(ButtonGroup, null, /*#__PURE__*/React.createElement(Button, {
      appearance: "primary",
      onClick: this.openFeedbackPopup
    }, "Give feedback"), /*#__PURE__*/React.createElement(Button, {
      appearance: "default",
      onClick: this.openLearnMorePage
    }, "Learn more")))))) : null;
  }

}

_defineProperty(ToolbarFeedback, "contextTypes", {
  editorActions: PropTypes.object.isRequired
});