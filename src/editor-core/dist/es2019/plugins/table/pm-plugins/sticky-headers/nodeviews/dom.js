export const getTree = tr => {
  // pm renders into tbody, owned by react
  const tbody = tr.parentElement;

  if (!tbody) {
    return null;
  } // rendered by react


  const table = tbody.parentElement;

  if (!table) {
    return null;
  } // rendered by react


  const wrapper = table.parentElement;

  if (!wrapper) {
    return null;
  }

  return {
    wrapper: wrapper,
    table: table
  };
};
export const getTop = element => {
  if (!element || element instanceof Window) {
    return 0;
  }

  return element.getBoundingClientRect().top;
};