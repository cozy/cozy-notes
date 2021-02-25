export let INDENT_DIRECTION;

(function (INDENT_DIRECTION) {
  INDENT_DIRECTION["INDENT"] = "indent";
  INDENT_DIRECTION["OUTDENT"] = "outdent";
})(INDENT_DIRECTION || (INDENT_DIRECTION = {}));

export let INDENT_TYPE;

(function (INDENT_TYPE) {
  INDENT_TYPE["PARAGRAPH"] = "paragraph";
  INDENT_TYPE["LIST"] = "list";
  INDENT_TYPE["HEADING"] = "heading";
  INDENT_TYPE["CODE_BLOCK"] = "codeBlock";
  INDENT_TYPE["TASK_LIST"] = "taskList";
})(INDENT_TYPE || (INDENT_TYPE = {}));