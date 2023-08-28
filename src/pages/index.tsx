import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="w-screen h-screen flex items-center flex-col justify-center">
      <div className="space-y-2 flex items-center flex-col">
        <h1 className="font-bold font-heading text-4xl animate-slideIn">
          VERSION GAMMA
        </h1>
        <p>This is a work in progress.</p>
        <p>{count}</p>
        <button
          className="m-2 p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-500 transition-colors"
          onClick={() => setCount(count + 1)}
        >
          Count
        </button>
        <Link
          to="/video"
          className="m-2 p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-500 transition-colors"
        >
          Go to Videos
        </Link>
      </div>
    </div>
  );
};

export default Index;
