import { resolveCard, setProvider } from '../actions';
import { replaceQueuedUrlWithCard } from '../doc'; // ============================================================================ //
// ============================== PROVIDER UTILS ============================== //
// ============================================================================ //
// Used for all interactions with the EditorCardProvider.
// ============================================================================ //

export const resolveWithProvider = (view, outstandingRequests, provider, request) => {
  const handleResolve = provider.resolve(request.url, request.appearance).then(resolvedCard => {
    delete outstandingRequests[request.url];
    return resolvedCard;
  }).then(handleResolved(view, request), handleRejected(view, request));
  outstandingRequests[request.url] = handleResolve;
  return handleResolve;
};

const handleResolved = (view, request) => resolvedCard => {
  replaceQueuedUrlWithCard(request.url, resolvedCard, request.analyticsAction)(view.state, view.dispatch);
  return resolvedCard;
};

const handleRejected = (view, request) => () => {
  view.dispatch(resolveCard(request.url)(view.state.tr));
}; // listen for card provider changes


export const handleProvider = (_, provider, view) => {
  if (!provider) {
    return;
  }

  provider.then(cardProvider => {
    const {
      state,
      dispatch
    } = view;
    dispatch(setProvider(cardProvider)(state.tr));
  });
};