import { animated } from '@react-spring/web';
import {
  BiCaretLeftCircle,
  BiCaretRightCircle,
  BiSolidPhotoAlbum,
} from 'react-icons/bi';
import useFadeIn from '../../hooks/use-fade';
import { useEffect, useState } from 'react';
import useWaitForImgLoad from '../../hooks/use-wait-for-img-load';
import Skeleton from '../skeleton';
import { applyConditionalStyle } from '../../utils/apply';

type OverlayImageProps = {
  src: string;
  display: boolean;
};

const OverlayImage = ({ src, display, }: OverlayImageProps) => {
  const hasImageLoaded = useWaitForImgLoad(src);

  if (!hasImageLoaded) {
    return (
      <Skeleton className={`self-center flex-grow-0 h-[calc(70vw*(2/3))] max-h-[80vh] ${applyConditionalStyle(!display, "w-0", "w-[70vw]")}`}>
        <BiSolidPhotoAlbum className="w-12 h-12" />
      </Skeleton>
    );
  }

  return (
    <img
      src={src ?? ''}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`self-center flex-grow-0 max-w-[70vw] max-h-[80vh] ${applyConditionalStyle(!display, "w-0")}`}
    />
  );
};

type Props = {
  allSrcs: string[];
  selectedSrc: string | null;
  onNext: (event: React.SyntheticEvent) => void;
  onPrevious: (event: React.SyntheticEvent) => void;
  onClickAway: () => void;
};

const Overlay = ({ allSrcs, selectedSrc, onNext, onPrevious, onClickAway }: Props) => {
  const [unload, setUnload] = useState(false);
  const open = !!selectedSrc;
  const [style] = useFadeIn(!unload, !open, onClickAway);

  useEffect(() => {
    if (open) {
      setUnload(false);
    }
  }, [selectedSrc]);

  const handleClose = () => {
    setUnload(true);
  };

  return (
    <animated.div
      style={style}
      onClick={handleClose}
      className={`fixed flex items-center justify-between px-20 top-0 left-0 bg-slate-800/80 
  w-screen overflow-hidden z-10 space-x-4 -md:hidden ${applyConditionalStyle(!open, "h-0", "h-screen")}`}
    >
      <button className="rounded-full hover-bg p-2" onClick={onPrevious}>
        <BiCaretLeftCircle className="w-16 h-16" />
      </button>
      <div>
        {allSrcs.map((src) => (
          <OverlayImage src={src} display={src === selectedSrc} />
        ))}
      </div>
      <button className="rounded-full hover-bg p-2" onClick={onNext}>
        <BiCaretRightCircle className="w-16 h-16 sm: " />
      </button>
    </animated.div>
  );
};

export default Overlay;
