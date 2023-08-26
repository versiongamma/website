import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>The site is live</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 2)}>Count +1</button>
    </>
  );
};
