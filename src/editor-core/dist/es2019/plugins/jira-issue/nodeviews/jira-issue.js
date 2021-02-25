import React from 'react';
import styled from 'styled-components';
import { JiraIcon } from '@atlaskit/logo';
import { borderRadius } from '@atlaskit/theme/constants';
import { N30, N50 } from '@atlaskit/theme/colors';
const WrapperNode = styled.span`
  align-items: center;
  background: ${N30};
  border: 1px solid ${N50};
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;
  cursor: default;
  display: inline-flex;
  font-size: 13px;
  margin: 0 2px;
  min-height: 24px;
  padding: 0 4px;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  .ProseMirror-selectednode & {
    background: ${N50};
    outline: none;
  }
`;
const JiraChildNode = styled.span`
  display: inline-block;
  color: #707070;
  line-height: 24px;
  vertical-align: top;

  &::before {
    color: black;
    content: 'JIRA | ';
  }
`;
const SvgChildNode = styled.span`
  display: inline-block;
  height: 24px;
  vertical-align: top;
  width: 24px;

  & > div {
    height: 24px;
    width: 24px;
  }
`;
export default function JIRAIssueNode(props) {
  const {
    node: {
      attrs: {
        issueKey
      }
    }
  } = props;
  return /*#__PURE__*/React.createElement(WrapperNode, null, /*#__PURE__*/React.createElement(SvgChildNode, null, /*#__PURE__*/React.createElement(JiraIcon, {
    size: "small"
  })), /*#__PURE__*/React.createElement(JiraChildNode, null, issueKey));
}