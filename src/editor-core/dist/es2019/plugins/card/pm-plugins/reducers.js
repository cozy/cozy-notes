const queue = (state, action) => {
  return { ...state,
    requests: state.requests.concat(action.requests)
  };
};

const resolve = (state, action) => {
  const requests = state.requests.reduce((requests, request) => {
    if (request.url !== action.url) {
      requests.push(request);
    }

    return requests;
  }, []);
  return { ...state,
    requests
  };
};

const register = (state, action) => {
  return { ...state,
    cards: state.cards.filter(card => card.pos !== action.info.pos).concat(action.info)
  };
};

const setProvider = (state, action) => {
  return { ...state,
    provider: action.provider
  };
};

const setLinkToolbar = (state, action) => {
  return { ...state,
    showLinkingToolbar: action.type === 'SHOW_LINK_TOOLBAR'
  };
};

export default ((state, action) => {
  switch (action.type) {
    case 'QUEUE':
      return queue(state, action);

    case 'SET_PROVIDER':
      return setProvider(state, action);

    case 'RESOLVE':
      return resolve(state, action);

    case 'REGISTER':
      return register(state, action);

    case 'SHOW_LINK_TOOLBAR':
    case 'HIDE_LINK_TOOLBAR':
      return setLinkToolbar(state, action);
  }
});