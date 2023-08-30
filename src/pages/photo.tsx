import { Link } from "react-router-dom";

const PhotoPage = () => (
  <div className="w-screen h-screen flex items-center flex-col justify-center">
    <div className="space-y-2 flex items-center flex-col">
      <h1 className="font-bold font-heading text-4xl animate-slideIn text-white">
        VERSION GAMMA
      </h1>
      <p className="text-white">This is the photo page.</p>
      <Link
        to="/"
        className="m-2 p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-500 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  </div>
);
export default PhotoPage;
