export default ((state, action) => {
  switch (action.type) {
    case 'updateAltText':
      {
        return { ...state
        };
      }

    case 'openMediaAltTextMenu':
      {
        return { ...state,
          isAltTextEditorOpen: true
        };
      }

    case 'closeMediaAltTextMenu':
      {
        return { ...state,
          isAltTextEditorOpen: false
        };
      }

    default:
      return state;
  }
});