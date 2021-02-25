export const addExcludesFromProviderFactory = (providerFactory, excludes = new Set()) => {
  // TODO: Should I make this function pure?
  if (!providerFactory.hasProvider('mentionProvider')) {
    excludes.add('mention');
  }

  if (!providerFactory.hasProvider('emojiProvider')) {
    excludes.add('emoji');
  }

  if (!providerFactory.hasProvider('macroProvider')) {
    excludes.add('macro');
  }

  if (!providerFactory.hasProvider('autoformattingProvider')) {
    excludes.add('customAutoformat');
  }

  if (!providerFactory.hasProvider('taskDecisionProvider')) {
    excludes.add('taskDecision');
  }

  if (!providerFactory.hasProvider('cardProvider')) {
    excludes.add('card');
  }

  return excludes;
};