import { normalizeUrl } from './utils';
import { stateKey, LinkAction } from './pm-plugins/main';
import { Selection } from 'prosemirror-state';
import { filter } from '../../utils/commands';
import { addAnalytics, ACTION, ACTION_SUBJECT, INPUT_METHOD, EVENT_TYPE, ACTION_SUBJECT_ID, withAnalytics } from '../analytics';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
import { getLinkCreationAnalyticsEvent } from './analytics';
export function isTextAtPos(pos) {
  return state => {
    const node = state.doc.nodeAt(pos);
    return !!node && node.isText;
  };
}
export function isLinkAtPos(pos) {
  return state => {
    const node = state.doc.nodeAt(pos);
    return !!node && state.schema.marks.link.isInSet(node.marks);
  };
}
export function setLinkHref(href, pos, to, isTabPressed) {
  return filter(isTextAtPos(pos), (state, dispatch) => {
    const $pos = state.doc.resolve(pos);
    const node = state.doc.nodeAt(pos);
    const linkMark = state.schema.marks.link;
    const mark = linkMark.isInSet(node.marks);
    const url = normalizeUrl(href);

    if (mark && mark.attrs.href === url) {
      return false;
    }

    const rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
    const tr = state.tr.removeMark(pos, rightBound, linkMark);

    if (href.trim()) {
      tr.addMark(pos, rightBound, linkMark.create({ ...(mark && mark.attrs || {}),
        href: url
      }));
    }

    if (!isTabPressed) {
      tr.setMeta(stateKey, {
        type: LinkAction.HIDE_TOOLBAR
      });
    }

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  });
}
export function updateLink(href, text, pos, to) {
  return (state, dispatch) => {
    const $pos = state.doc.resolve(pos);
    const node = state.doc.nodeAt(pos);

    if (!node) {
      return false;
    }

    const url = normalizeUrl(href);

    if (!url) {
      return false;
    }

    const mark = state.schema.marks.link.isInSet(node.marks);
    const linkMark = state.schema.marks.link;
    const rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
    const tr = state.tr;
    tr.insertText(text, pos, rightBound); // Casting to LinkAttributes to prevent wrong attributes been passed (Example ED-7951)

    const linkAttrs = { ...(mark && mark.attrs || {}),
      href: url
    };
    tr.addMark(pos, pos + text.length, linkMark.create(linkAttrs));
    tr.setMeta(stateKey, {
      type: LinkAction.HIDE_TOOLBAR
    });

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  };
}
export function setLinkText(text, pos, to) {
  return filter(isLinkAtPos(pos), (state, dispatch) => {
    const $pos = state.doc.resolve(pos);
    const node = state.doc.nodeAt(pos);
    const mark = state.schema.marks.link.isInSet(node.marks);

    if (node && text.length > 0 && text !== node.text) {
      const rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
      const tr = state.tr;
      tr.insertText(text, pos, rightBound);
      tr.addMark(pos, pos + text.length, mark);
      tr.setMeta(stateKey, {
        type: LinkAction.HIDE_TOOLBAR
      });

      if (dispatch) {
        dispatch(tr);
      }

      return true;
    }

    return false;
  });
}
export function insertLink(from, to, incomingHref, incomingTitle, displayText, source) {
  return (state, dispatch) => {
    const link = state.schema.marks.link;

    if (incomingHref.trim()) {
      const {
        tr
      } = state;
      const normalizedUrl = normalizeUrl(incomingHref); // NB: in this context, `currentText` represents text which has been
      // highlighted in the Editor, upon which a link is is being added.

      const currentText = stateKey.getState(state).activeText;
      let markEnd = to;
      const text = displayText || incomingTitle || incomingHref;

      if (!displayText || displayText !== currentText) {
        tr.insertText(text, from, to);
        markEnd = from + text.length;
      }

      tr.addMark(from, markEnd, link.create({
        href: normalizedUrl
      }));
      tr.setSelection(Selection.near(tr.doc.resolve(markEnd))); //Create a smart link when the user doesn't provide a title

      if (isSmartLink(incomingHref, source, incomingTitle, displayText)) {
        queueCardsFromChangedTr(state, tr, source, false);
      }

      tr.setMeta(stateKey, {
        type: LinkAction.HIDE_TOOLBAR
      });

      if (dispatch) {
        dispatch(tr);
      }

      return true;
    }

    return false;
  };
}
export const insertLinkWithAnalytics = (inputMethod, from, to, href, title, displayText) => {
  // If we are inserting a smart link, skip insert hyperlink analytics
  if (isSmartLink(href, inputMethod, title, displayText)) {
    return insertLink(from, to, href, title, displayText, inputMethod);
  } else {
    return withAnalytics(getLinkCreationAnalyticsEvent(inputMethod, href))(insertLink(from, to, href, title, displayText, inputMethod));
  }
};

const isSmartLink = (href, inputMethod, title, displayText) => // NB: A link is a Smart Link if:
// - it is inserted from the CMD + K menu without display text
// - it is inserted manually (by typing) without display text and a title
// - it is inserted using either approach and the display text, href are the same
inputMethod && inputMethod === INPUT_METHOD.TYPEAHEAD && !displayText || inputMethod && inputMethod === INPUT_METHOD.MANUAL && !title && !displayText || displayText === href;

export function removeLink(pos) {
  return setLinkHref('', pos);
}
export function editInsertedLink() {
  return (state, dispatch) => {
    if (dispatch) {
      dispatch(state.tr.setMeta(stateKey, {
        type: LinkAction.EDIT_INSERTED_TOOLBAR,
        inputMethod: INPUT_METHOD.FLOATING_TB
      }));
    }

    return true;
  };
}
export function showLinkToolbar(inputMethod = INPUT_METHOD.TOOLBAR) {
  return function (state, dispatch) {
    if (dispatch) {
      let tr = state.tr.setMeta(stateKey, {
        type: LinkAction.SHOW_INSERT_TOOLBAR,
        inputMethod
      });
      tr = addAnalytics(state, tr, {
        action: ACTION.INVOKED,
        actionSubject: ACTION_SUBJECT.TYPEAHEAD,
        actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_LINK,
        attributes: {
          inputMethod
        },
        eventType: EVENT_TYPE.UI
      });
      dispatch(tr);
    }

    return true;
  };
}
export function hideLinkToolbar() {
  return function (state, dispatch) {
    if (dispatch) {
      dispatch(state.tr.setMeta(stateKey, {
        type: LinkAction.HIDE_TOOLBAR
      }));
    }

    return true;
  };
}