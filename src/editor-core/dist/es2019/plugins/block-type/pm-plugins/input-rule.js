import { textblockTypeInputRule, wrappingInputRule } from 'prosemirror-inputrules';
import { createInputRule, instrumentedInputRule, defaultInputRuleHandler, leafNodeReplacementCharacter } from '../../../utils/input-rules';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../commands/transform-to-code-block';
import { insertBlock } from '../commands/insert-block';
import { safeInsert } from 'prosemirror-utils';
import { addAnalytics, INPUT_METHOD, ACTION, ACTION_SUBJECT, EVENT_TYPE, ACTION_SUBJECT_ID, ruleWithAnalytics } from '../../analytics';
const MAX_HEADING_LEVEL = 6;

function getHeadingLevel(match) {
  return {
    level: match[1].length
  };
}

export function headingRule(nodeType, maxLevel) {
  return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, getHeadingLevel);
}
export function blockQuoteRule(nodeType) {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
}
export function codeBlockRule(nodeType) {
  return textblockTypeInputRule(/^```$/, nodeType);
}
/**
 * Get heading rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */

function getHeadingRules(schema) {
  // '# ' for h1, '## ' for h2 and etc
  const hashRule = defaultInputRuleHandler(headingRule(schema.nodes.heading, MAX_HEADING_LEVEL), true);
  const leftNodeReplacementHashRule = createInputRule(new RegExp(`${leafNodeReplacementCharacter}(#{1,6})\\s$`), (state, match, start, end) => {
    const level = match[1].length;
    return insertBlock(state, schema.nodes.heading, `heading${level}`, start, end, {
      level
    });
  }, true); // New analytics handler

  const ruleWithHeadingAnalytics = ruleWithAnalytics((_state, match) => ({
    action: ACTION.FORMATTED,
    actionSubject: ACTION_SUBJECT.TEXT,
    eventType: EVENT_TYPE.TRACK,
    actionSubjectId: ACTION_SUBJECT_ID.FORMAT_HEADING,
    attributes: {
      inputMethod: INPUT_METHOD.FORMATTING,
      newHeadingLevel: getHeadingLevel(match).level
    }
  }));
  return [ruleWithHeadingAnalytics(hashRule), ruleWithHeadingAnalytics(leftNodeReplacementHashRule)];
}
/**
 * Get all block quote input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */


function getBlockQuoteRules(schema) {
  // '> ' for blockquote
  const greatherThanRule = defaultInputRuleHandler(blockQuoteRule(schema.nodes.blockquote), true);
  const leftNodeReplacementGreatherRule = createInputRule(new RegExp(`${leafNodeReplacementCharacter}\\s*>\\s$`), (state, _match, start, end) => {
    return insertBlock(state, schema.nodes.blockquote, 'blockquote', start, end);
  }, true); // Analytics V3 handler

  const ruleWithBlockQuoteAnalytics = ruleWithAnalytics(() => ({
    action: ACTION.FORMATTED,
    actionSubject: ACTION_SUBJECT.TEXT,
    eventType: EVENT_TYPE.TRACK,
    actionSubjectId: ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
    attributes: {
      inputMethod: INPUT_METHOD.FORMATTING
    }
  }));
  return [ruleWithBlockQuoteAnalytics(greatherThanRule), ruleWithBlockQuoteAnalytics(leftNodeReplacementGreatherRule)];
}
/**
 * Get all code block input rules
 *
 * @param {Schema} schema
 * @returns {InputRuleWithHandler[]}
 */


function getCodeBlockRules(schema) {
  const analyticsPayload = {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId: ACTION_SUBJECT_ID.CODE_BLOCK,
    attributes: {
      inputMethod: INPUT_METHOD.FORMATTING
    },
    eventType: EVENT_TYPE.TRACK
  };
  const threeTildeRule = createInputRule(/((^`{3,})|(\s`{3,}))(\S*)$/, (state, match, start, end) => {
    const attributes = {};

    if (match[4]) {
      attributes.language = match[4];
    }

    const newStart = match[0][0] === ' ' ? start + 1 : start;

    if (isConvertableToCodeBlock(state)) {
      const tr = transformToCodeBlockAction(state, attributes) // remove markdown decorator ```
      .delete(newStart, end).scrollIntoView();
      return addAnalytics(state, tr, analyticsPayload);
    }

    let {
      tr
    } = state;
    tr = tr.delete(newStart, end);
    const codeBlock = state.schema.nodes.codeBlock.createChecked();
    return safeInsert(codeBlock)(tr);
  }, true);
  const leftNodeReplacementThreeTildeRule = createInputRule(new RegExp(`((${leafNodeReplacementCharacter}\`{3,})|(\\s\`{3,}))(\\S*)$`), (state, match, start, end) => {
    const attributes = {};

    if (match[4]) {
      attributes.language = match[4];
    }

    let tr = insertBlock(state, schema.nodes.codeBlock, 'codeblock', start, end, attributes);

    if (tr) {
      tr = addAnalytics(state, tr, analyticsPayload);
    }

    return tr;
  }, true);
  return [threeTildeRule, leftNodeReplacementThreeTildeRule];
}

export function inputRulePlugin(schema) {
  const rules = [];

  if (schema.nodes.heading) {
    rules.push(...getHeadingRules(schema));
  }

  if (schema.nodes.blockquote) {
    rules.push(...getBlockQuoteRules(schema));
  }

  if (schema.nodes.codeBlock) {
    rules.push(...getCodeBlockRules(schema));
  }

  if (rules.length !== 0) {
    return instrumentedInputRule('block-type', {
      rules
    });
  }

  return;
}
export default inputRulePlugin;