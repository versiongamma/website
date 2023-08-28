import { Link } from "react-router-dom";

const Videos = () => (
  <div className="w-screen h-screen flex items-center flex-col justify-center">
    <div className="space-y-2 flex items-center flex-col">
      <h1 className="font-bold font-heading text-4xl animate-slideIn">
        VERSION GAMMA
      </h1>
      <p>This is the video page.</p>
      <Link
        to="/"
        className="m-2 p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-500 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  </div>
);

export default Videos;
