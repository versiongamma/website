import { BiCodeAlt } from "react-icons/bi";
import { FiCamera, FiYoutube } from "react-icons/fi";
import { RiHome8Line } from "react-icons/ri";

import { useLocation } from "react-router-dom";
import useNavigate from "../hooks/use-navigate";
import { applyConditionally } from "../utils/apply";
import { animated, useSpring, useTrail } from "@react-spring/web";
import { usePageLoadTypeStore } from "../hooks/use-store";
import { PATHNAME_TO_INFO_MAP, routes } from "../pages/routes";

type Props = {
  shown: boolean;
  hide?: boolean;
  enterImmediately?: boolean;
  handleNavigate?: () => void;
};

const NavigationBar = ({
  shown,
  hide,
  handleNavigate,
  enterImmediately,
}: Props) => {
  const { pathname } = useLocation();
  const { playPageFullLoad, setPageToContentLoad } = usePageLoadTypeStore();

  const indicatorPosition = PATHNAME_TO_INFO_MAP[pathname].indicatorPosition;

  const animationConfig = {
    reverse: !shown,
    reset: true,
    immediate: enterImmediately || hide,
  };

  const [barStyle] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      ...animationConfig,
    }),
    [shown, playPageFullLoad, hide, animationConfig]
  );

  const [iconStyles] = useTrail(
    4,
    () => ({
      from: { y: 60 },
      to: { y: 0 },
      ...animationConfig,
    }),
    [shown, playPageFullLoad, hide, animationConfig]
  );

  const [indicatorStyle, indicatorStyleApi] = useSpring(() => ({
    from: { x: indicatorPosition },
  }));

  const onNavigate = (path: string) => {
    setPageToContentLoad();
    indicatorStyleApi.start({
      to: { x: PATHNAME_TO_INFO_MAP[path].indicatorPosition },
    });
    handleNavigate && handleNavigate();
  };

  const [navigateToInfo] = useNavigate("/info", 500, [
    () => onNavigate("/info"),
  ]);

  const [navigateToVideo] = useNavigate("/video", 500, [
    () => onNavigate("/video"),
  ]);
  const [navigateToPhoto] = useNavigate("/photo", 500, [
    () => onNavigate("/photo"),
  ]);
  const [navigateToSoftware] = useNavigate("/software", 500, [
    () => onNavigate("/software"),
  ]);

  const actions = [
    { icon: RiHome8Line, navigate: navigateToInfo, pathname: "/info" },
    { icon: FiYoutube, navigate: navigateToVideo, pathname: "/video" },
    { icon: FiCamera, navigate: navigateToPhoto, pathname: "/photo" },
    { icon: BiCodeAlt, navigate: navigateToSoftware, pathname: "/software" },
  ];

  return (
    <animated.div
      className="flex fixed w-screen h-14 bottom-0 bg-slate-700/20 items-center justify-center space-x-5"
      style={barStyle}
    >
      <animated.div
        className="absolute bg-white z-[-1] w-12 h-1 mt-[52px] rounded-md"
        style={indicatorStyle}
      />
      {actions.map(({ icon: Icon, navigate, pathname: actionPath }, index) => {
        const currentPage = actionPath === pathname;
        return (
          <animated.a
            key={index}
            style={iconStyles[index]}
            onClick={applyConditionally(!currentPage, navigate)}
            className="p-3 rounded-full hover:bg-gray-500/20 transition-colors"
          >
            <Icon className="text-white w-6 h-6 z-1" />
          </animated.a>
        );
      })}
    </animated.div>
  );
};

export default NavigationBar;
