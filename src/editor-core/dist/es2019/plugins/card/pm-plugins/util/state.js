import { pluginKey } from '../plugin-key'; // ============================================================================ //
// ============================== PLUGIN STATE ================================ //
// ============================================================================ //
// Used for interactions with the Card Plugin's state.
// ============================================================================ //

export const getPluginState = editorState => pluginKey.getState(editorState);
export const getPluginStateWithUpdatedPos = (pluginState, tr) => ({ ...pluginState,
  requests: pluginState.requests.map(request => ({ ...request,
    pos: tr.mapping.map(request.pos)
  })),
  cards: pluginState.cards.map(card => ({ ...card,
    pos: tr.mapping.map(card.pos)
  }))
});
export const getNewRequests = (oldState, currentState) => {
  if (oldState) {
    return currentState.requests.filter(req => !oldState.requests.find(oldReq => isSameRequest(oldReq, req)));
  }

  return currentState.requests;
};

const isSameRequest = (requestA, requestB) => requestA.url === requestB.url && requestA.pos === requestB.pos;