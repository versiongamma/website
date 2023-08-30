import { useEffect } from "react";

import useAnimate from "../hooks/use-animate";
import { applyConditionalStyle } from "../utils/style";

type Props = {
  show: boolean;
  hide: boolean;
  children: React.ReactNode;
};

const TitleBar = ({ show, hide, children }: Props) => {
  const [showTitle, hideTitle, loadTitle, unloadTitle] = useAnimate(false);
  const [showLinks, hideLinks, loadLinks, unloadLinks] = useAnimate(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => loadTitle(), 150);
      setTimeout(() => loadLinks(), 350);
    }

    if (hide) {
      unloadLinks();
      setTimeout(() => unloadTitle(), 100);
    }
  }, [show, hide]);

  return (
    <div className="m-[300px] relative">
      <div className="absolute h-96 w-1 bg-white rotate-[30deg] translate-x-[-30px] translate-y-[-100px]"></div>
      <h1
        className={`font-heading font-bold text-[7rem] text-white ml-[40px] ${applyConditionalStyle(
          showTitle,
          "animate-slideIn",
          "opacity-0"
        )} ${applyConditionalStyle(hideTitle, "animate-slideOut opacity-0")}`}
      >
        VERSION GAMMA
      </h1>
      <div>
        <p
          className={`text-white text-3xl ${applyConditionalStyle(
            showLinks,
            "animate-slideIn",
            "opacity-0"
          )} ${applyConditionalStyle(hideLinks, "animate-slideOut opacity-0")}`}
        >
          making {children}, and more.
        </p>
      </div>
    </div>
  );
};

export default TitleBar;
