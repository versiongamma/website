import { BiCodeAlt } from "react-icons/bi";
import { FiCamera, FiYoutube } from "react-icons/fi";
import { RiHome8Line } from "react-icons/ri";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAnimate from "../hooks/use-animate";
import useNavigate from "../hooks/use-navigate";
import { usePageLoadTypeStore } from "../hooks/use-store";
import { applyConditionalStyle, applyConditionally } from "../utils/apply";

const ICON_SHOW_INTERVAL = 100;
const ICON_HIDE_INTERVAL = 50;

type Props = {
  shown: boolean;
  handleNavigate: () => void;
};

const NavigationBar = ({ shown, handleNavigate }: Props) => {
  const { playPageFullLoad, setPageToFullLoad } = usePageLoadTypeStore();
  const { pathname } = useLocation();

  const [navBarStyle, loadNavBar, unloadNavBar] = useAnimate({
    enter: { animation: "slideUp", duration: 500 },
    exit: { animation: "slideDown", duration: 500 },
  });

  const [navigateToIndex] = useNavigate("/", 500, [
    handleNavigate,
    () => setPageToFullLoad(),
  ]);
  const [navigateToVideo] = useNavigate("/video", 500, [handleNavigate]);
  const [navigateToPhoto] = useNavigate("/photo", 500, [handleNavigate]);
  const [navigateToSoftware] = useNavigate("/software", 500, [handleNavigate]);

  const actions = [
    { icon: RiHome8Line, navigate: navigateToIndex, pathname: "/" },
    { icon: FiYoutube, navigate: navigateToVideo, pathname: "/video" },
    { icon: FiCamera, navigate: navigateToPhoto, pathname: "/photo" },
    { icon: BiCodeAlt, navigate: navigateToSoftware, pathname: "/software" },
  ];

  const animationControls = actions.map(() =>
    useAnimate(
      {
        enter: { animation: "slideUp", duration: 500 },
        exit: { animation: "slideDown", duration: 500 },
      },
      true
    )
  );

  useEffect(() => {
    if (shown) {
      loadNavBar();
      animationControls.forEach(([, load], index) => {
        setTimeout(() => load(), (index + 1) * ICON_SHOW_INTERVAL);
      });
    }

    if (!shown) {
      unloadNavBar();
      animationControls.forEach(([, , unload], index) => {
        setTimeout(() => unload(), index * ICON_HIDE_INTERVAL);
      });
    }
  }, [shown]);

  return (
    <div
      className={`flex fixed w-screen h-14 bottom-0 bg-slate-700/20 items-center justify-center space-x-5 ${navBarStyle}`}
    >
      {actions.map(({ icon: Icon, navigate, pathname: actionPath }, index) => {
        const [style] = animationControls[index];
        const disabled = actionPath === pathname;
        return (
          <a
            key={index}
            onClick={applyConditionally(!disabled, navigate)}
            className={`${style} p-3 rounded-full hover:bg-gray-500/20 transition-colors ${applyConditionalStyle(
              disabled,
              "bg-gray-700 hover:bg-gray-700"
            )}`}
          >
            <Icon className="text-white w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
};

export default NavigationBar;
