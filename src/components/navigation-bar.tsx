import {
  BiSolidInfoCircle,
  BiSolidVideo,
  BiSolidCamera,
  BiCodeBlock,
  BiSolidContact,
} from 'react-icons/bi';

import { useLocation } from 'react-router-dom';
import useNavigate from '../hooks/use-navigate';
import { applyConditionally } from '../utils/apply';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { usePageLoadTypeStore } from '../hooks/use-store';
import { PATHNAME_TO_INFO_MAP } from '../pages/routes';

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
    5,
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

  const [navigateToInfo] = useNavigate('/info', 500, [
    () => onNavigate('/info'),
  ]);

  const [navigateToContact] = useNavigate('/contact', 500, [
    () => onNavigate('/contact'),
  ]);

  const [navigateToVideo] = useNavigate('/video', 500, [
    () => onNavigate('/video'),
  ]);
  const [navigateToPhoto] = useNavigate('/photos', 500, [
    () => onNavigate('/photos'),
  ]);
  const [navigateToSoftware] = useNavigate('/software', 500, [
    () => onNavigate('/software'),
  ]);

  const actions = [
    {
      icon: BiSolidInfoCircle,
      navigate: navigateToInfo,
      pathname: '/info',
    },
    {
      icon: BiSolidContact,
      navigate: navigateToContact,
      pathname: '/contact',
    },
    { icon: BiSolidVideo, navigate: navigateToVideo, pathname: '/video' },
    { icon: BiSolidCamera, navigate: navigateToPhoto, pathname: '/photos' },
    {
      icon: BiCodeBlock,
      navigate: navigateToSoftware,
      pathname: '/software',
    },
  ];

  return (
    // Wrapper div is so bar doesn't show up until css is properly loaded
    <div style={{ opacity: !hide ? 1 : 0 }}>
      <animated.div
        className="flex fixed w-screen h-[calc(3.5rem+env(safe-area-inset-bottom))] bottom-0 bg-slate-700/20 items-center justify-center space-x-5 pb-[env(safe-area-inset-bottom)]"
        style={barStyle}
      >
        <animated.div
          className="absolute bg-white z-[-1] w-12 h-1 mt-[52px] rounded-md"
          style={indicatorStyle}
        />
        {actions.map(
          ({ icon: Icon, navigate, pathname: actionPath }, index) => {
            const currentPage = actionPath === pathname;
            return (
              <animated.a
                key={index}
                style={iconStyles[index]}
                onClick={applyConditionally(!currentPage, navigate)}
                className="p-3 rounded-full hover-bg"
              >
                <Icon className="text-white w-6 h-6 z-1" />
              </animated.a>
            );
          }
        )}
      </animated.div>
    </div>
  );
};

export default NavigationBar;
