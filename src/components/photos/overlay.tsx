import { animated } from "@react-spring/web";
import { BiCaretLeftCircle, BiCaretRightCircle } from "react-icons/bi";
import useFadeIn from "../../hooks/use-fade";
import { useEffect, useState } from "react";

type Props = {
  src: string | null;
  onNext: (event: React.SyntheticEvent) => void;
  onPrevious: (event: React.SyntheticEvent) => void;
  onClickAway: () => void;
};

const Overlay = ({ src, onNext, onPrevious, onClickAway }: Props) => {
  const [unload, setUnload] = useState(false);
  const open = !!src;
  const [style] = useFadeIn(!unload, !open, onClickAway);

  useEffect(() => {
    if (open) {
      setUnload(false);
    }
  }, [src]);

  const handleClose = () => {
    setUnload(true);
  };

  if (!open) {
    return null;
  }

  return (
    <animated.div
      style={style}
      onClick={handleClose}
      className="fixed flex items-center justify-center top-0 left-0 bg-slate-800/80 
  w-screen h-screen overflow-hidden z-10 space-x-4"
    >
      <button className="rounded-full hover-bg p-2" onClick={onPrevious}>
        <BiCaretLeftCircle className="w-16 h-16" />
      </button>
      <img
        src={src ?? ""}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" self-center flex-grow-0 max-w-[70vw] max-h-[80vh]"
      />
      <button className="rounded-full hover-bg p-2" onClick={onNext}>
        <BiCaretRightCircle className="w-16 h-16 sm: " />
      </button>
    </animated.div>
  );
};

export default Overlay;
