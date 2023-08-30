import { BiCodeAlt } from "react-icons/bi";
import { FiCamera, FiYoutube } from "react-icons/fi";
import { RiHome8Line } from "react-icons/ri";

import useAnimate from "../hooks/use-animate";
import { applyConditionalStyle } from "../utils/style";
import { useEffect } from "react";

const iconStyle = "text-white w-6 h-6";

type Props = {
  show: boolean;
  hide: boolean;
};

const NavigationBar = ({ show, hide }: Props) => {
  const [showHomeIcon, hideHomeIcon, loadHomeIcon, unloadHomeIcon] =
    useAnimate(false);
  const [showVideoIcon, hideVideoIcon, loadVideoIcon, unloadVideoIcon] =
    useAnimate(false);
  const [showPhotoIcon, hidePhotoIcon, loadPhotoIcon, unloadPhotoIcon] =
    useAnimate(false);
  const [showCodeIcon, hideCodeIcon, loadCodeIcon, unloadCodeIcon] =
    useAnimate(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => loadHomeIcon(), 100);
      setTimeout(() => loadVideoIcon(), 200);
      setTimeout(() => loadPhotoIcon(), 300);
      setTimeout(() => loadCodeIcon(), 400);
    }

    if (hide) {
      unloadCodeIcon();
      setTimeout(() => unloadPhotoIcon(), 50);
      setTimeout(() => unloadVideoIcon(), 100);
      setTimeout(() => unloadHomeIcon(), 150);
    }
  }, [show, hide]);

  return (
    <div
      className={`flex fixed w-screen h-14 bottom-0 bg-slate-700 items-center justify-center space-x-5 ${applyConditionalStyle(
        show,
        "animate-slideUp",
        "opacity-0"
      )} ${applyConditionalStyle(hide, "animate-slideDown opacity-0")}`}
    >
      <button
        className={`p-3 rounded-full hover:bg-gray-500/20 transition-colors ${applyConditionalStyle(
          showHomeIcon,
          "animate-slideUp",
          "opacity-0"
        )} ${applyConditionalStyle(
          hideHomeIcon,
          "animate-slideDown opacity-0"
        )}`}
      >
        <RiHome8Line className={iconStyle} />
      </button>
      <button
        className={`p-3 rounded-full hover:bg-gray-500/20 transition-colors ${applyConditionalStyle(
          showVideoIcon,
          "animate-slideUp",
          "opacity-0"
        )} ${applyConditionalStyle(
          hideVideoIcon,
          "animate-slideDown opacity-0"
        )}`}
      >
        <FiYoutube className={iconStyle} />
      </button>
      <button
        className={`p-3 rounded-full hover:bg-gray-500/20 transition-colors ${applyConditionalStyle(
          showPhotoIcon,
          "animate-slideUp",
          "opacity-0"
        )} ${applyConditionalStyle(
          hidePhotoIcon,
          "animate-slideDown opacity-0"
        )}`}
      >
        <FiCamera className={iconStyle} />
      </button>
      <button
        className={`p-3 rounded-full hover:bg-gray-500/20 transition-colors ${applyConditionalStyle(
          showCodeIcon,
          "animate-slideUp",
          "opacity-0"
        )} ${applyConditionalStyle(
          hideCodeIcon,
          "animate-slideDown opacity-0"
        )}`}
      >
        <BiCodeAlt className={iconStyle} />
      </button>
    </div>
  );
};

export default NavigationBar;
