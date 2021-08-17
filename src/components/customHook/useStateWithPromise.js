import React, { useState, useRef, useEffect, useCallback } from 'react';

const useStateWithPromise = (initialState) => {
  const [state, setState] = useState(initialState);
  const resolveRef = useRef(null);

  useEffect(() => {
    if (resolveRef.current) {
      resolveRef.current(state);
      resolveRef.current(null);
    }
  }, [resolveRef.current, state]);

  const handleState = useCallback(
    (stateAction) => {
      setState(stateAction);
      return new Promise((resolve) => {
        resolveRef.current = resolve;
      });
    },
    [setState]
  );

  return [state, handleState];
};

export default useStateWithPromise;
