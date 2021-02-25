export let LAYOUT_TYPE;

(function (LAYOUT_TYPE) {
  LAYOUT_TYPE["TWO_COLS_EQUAL"] = "twoColumnsEqual";
  LAYOUT_TYPE["THREE_COLS_EQUAL"] = "threeColumnsEqual";
  LAYOUT_TYPE["LEFT_SIDEBAR"] = "twoColumnsLeftSidebar";
  LAYOUT_TYPE["RIGHT_SIDEBAR"] = "twoColumnsRightSidebar";
  LAYOUT_TYPE["THREE_WITH_SIDEBARS"] = "threeColumnsWithSidebars ";
})(LAYOUT_TYPE || (LAYOUT_TYPE = {}));

export let SMART_LINK_TYPE;

(function (SMART_LINK_TYPE) {
  SMART_LINK_TYPE["INLINE_CARD"] = "inline";
  SMART_LINK_TYPE["BLOCK_CARD"] = "block";
  SMART_LINK_TYPE["URL"] = "url";
})(SMART_LINK_TYPE || (SMART_LINK_TYPE = {}));