import React, { startTransition, useReducer, useState } from 'react';
function reducer(state, action) {
  switch (action.type) {
    case 'Increment':
      return { count: state.count + 1 };
    case 'Decrement':
      return { count: state.count - 1 };
  }
}
const ReducerComponent = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function Increment() {
    dispatch({ type: 'Increment' });
  }
  function Decrement() {
    dispatch({ type: 'Decrement' });
  }
  return (
    <div>
      <button onClick={Increment}>Increment</button>
      <p>{state.count}</p>
      {state.count > 0 && <button onClick={Decrement}>Decrement</button>}
    </div>
  );
};

export default ReducerComponent;
