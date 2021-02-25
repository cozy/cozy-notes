export let USER_CONTEXT;

(function (USER_CONTEXT) {
  USER_CONTEXT["EDIT"] = "edit";
  USER_CONTEXT["NEW"] = "new";
})(USER_CONTEXT || (USER_CONTEXT = {}));

export let LINK_STATUS;

(function (LINK_STATUS) {
  LINK_STATUS["RESOLVED"] = "resolved";
  LINK_STATUS["UNRESOLVED"] = "unresolved";
})(LINK_STATUS || (LINK_STATUS = {}));

export let LINK_REPRESENTATION;

(function (LINK_REPRESENTATION) {
  LINK_REPRESENTATION["TEXT"] = "text";
  LINK_REPRESENTATION["INLINE_CARD"] = "inlineCard";
  LINK_REPRESENTATION["BLOCK_CARD"] = "blockCard";
  LINK_REPRESENTATION["EMBED"] = "embed";
})(LINK_REPRESENTATION || (LINK_REPRESENTATION = {}));

export let LINK_RESOURCE;

(function (LINK_RESOURCE) {
  LINK_RESOURCE["JIRA"] = "jiraIssue";
  LINK_RESOURCE["CONFLUENCE"] = "confluencePage";
  LINK_RESOURCE["BITBUCKET_PR"] = "bitbucketPR";
  LINK_RESOURCE["BITBUCKET_REPO"] = "bitbucketRepo";
  LINK_RESOURCE["TRELLO_CARD"] = "trelloCard";
  LINK_RESOURCE["TRELLO_BOARD"] = "trelloBoard";
  LINK_RESOURCE["STATUS_PAGE"] = "statusPage";
  LINK_RESOURCE["BOX"] = "boxFile";
  LINK_RESOURCE["DROPBOX"] = "dropboxFile";
  LINK_RESOURCE["OFFICE"] = "office";
  LINK_RESOURCE["DRIVE"] = "drive";
  LINK_RESOURCE["YOUTUBE"] = "youtubeVideo";
  LINK_RESOURCE["TWITTER"] = "twitterTweet";
  LINK_RESOURCE["OTHER"] = "other";
})(LINK_RESOURCE || (LINK_RESOURCE = {}));