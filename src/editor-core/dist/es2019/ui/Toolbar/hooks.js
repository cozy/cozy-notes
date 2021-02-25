import React from 'react';
export const useElementWidth = (ref, {
  skip
}) => {
  const [elementWidth, setWidth] = React.useState(undefined);
  React.useEffect(() => {
    if (!skip && ref.current) {
      setWidth(Math.round(ref.current.getBoundingClientRect().width));
    }
  }, [skip, setWidth, ref]);
  return elementWidth;
};