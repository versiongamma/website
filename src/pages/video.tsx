import { Link } from "react-router-dom";
import NavigationBar from "../components/navigation-bar";
import { useEffect, useState } from "react";
import { applyConditionalStyle } from "../utils/style";

const VideoPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [unload, setUnloaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 0);
  }, []);

  return (
    <>
      <div
        className={`w-screen h-screen flex items-center flex-col justify-center background-gradient ${applyConditionalStyle(
          loaded,
          "animate-fadeIn",
          "opacity-0"
        )}`}
      >
        <div className="space-y-2 flex items-center flex-col">
          <h1 className="font-bold font-heading text-4xl animate-slideIn text-white">
            VERSION GAMMA
          </h1>
          <p className="text-white">This is the video page.</p>
          <Link
            to="/"
            className="m-2 p-2 bg-slate-700 text-white rounded-xl hover:bg-slate-500 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <NavigationBar show={loaded} hide={unload} />
    </>
  );
};

export default VideoPage;
