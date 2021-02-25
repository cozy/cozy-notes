import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Loadable from 'react-loadable';
import Button from '@atlaskit/button/custom-theme-button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { borderRadius } from '@atlaskit/theme/constants';
import { N200 } from '@atlaskit/theme/colors';
import { messages } from './messages';
const iconWidth = 40;
const buttonWidth = 40;
const margin = 16;
const gapSizeForEllipsis = iconWidth + buttonWidth + margin * 2;
const Item = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
const ItemIcon = styled.div`
  width: ${iconWidth}px;
  height: ${iconWidth}px;
  overflow: hidden;
  border: 1px solid rgba(223, 225, 229, 0.5); /* N60 at 50% */
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: ${iconWidth}px;
    height: ${iconWidth}px;
  }
`;
const ItemBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  line-height: 1.4;
  margin: 0 16px;
  flex-grow: 3;
  max-width: calc(100% - ${gapSizeForEllipsis}px);
`;
const CenteredItemTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
CenteredItemTitle.displayName = 'CenteredItemTitle';
const ItemText = styled.div`
  max-width: 100%;
  white-space: initial;
  .item-summary {
    font-size: 11.67px;
    color: ${N200};
    margin-top: 4px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
ItemText.displayName = 'ItemText';
const Description = styled.p`
  margin-bottom: 24px;
`;
Description.displayName = 'Description';
const CloseButtonWrapper = styled.div`
  width: ${buttonWidth}px;
  text-align: right;
`;

const Header = ({
  icon,
  title,
  description,
  summary,
  documentationUrl,
  onClose,
  intl
}) => {
  const ResolvedIcon = Loadable({
    loader: icon,
    loading: () => null
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Item, null, /*#__PURE__*/React.createElement(ItemIcon, null, /*#__PURE__*/React.createElement(ResolvedIcon, {
    label: title
  })), /*#__PURE__*/React.createElement(ItemBody, null, summary ? /*#__PURE__*/React.createElement(ItemText, null, /*#__PURE__*/React.createElement("div", {
    className: "item-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "item-summary"
  }, summary)) : /*#__PURE__*/React.createElement(CenteredItemTitle, null, title)), /*#__PURE__*/React.createElement(CloseButtonWrapper, null, /*#__PURE__*/React.createElement(Button, {
    appearance: "subtle",
    iconBefore: /*#__PURE__*/React.createElement(CrossIcon, {
      label: intl.formatMessage(messages.close)
    }),
    onClick: onClose
  }))), (description || documentationUrl) && /*#__PURE__*/React.createElement(Description, null, description && /*#__PURE__*/React.createElement(React.Fragment, null, description.replace(/([^.])$/, '$1.'), " "), documentationUrl && /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: documentationUrl
  }, intl.formatMessage(messages.documentation))));
};

export default injectIntl(Header);