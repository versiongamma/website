import useWaitForImgLoad from '../../hooks/use-wait-for-img-load';
import Skeleton from '../skeleton';
import { RenderImageProps } from 'react-photo-gallery';
import { BiSolidPhotoAlbum } from 'react-icons/bi';

import useFadeIn from '../../hooks/use-fade';
import { animated } from '@react-spring/web';

const Image = ({ photo, index, onClick }: RenderImageProps) => {
  const { src, width, height } = photo;
  const thumbnailSrc = src.replace('.jpg', '.md.jpg');
  const hasImageLoaded = useWaitForImgLoad(thumbnailSrc);

  const [style] = useFadeIn(hasImageLoaded, !hasImageLoaded);

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    onClick && onClick(event, { ...photo, index });
  };

  return (
    <div className="p-2" style={{ width, height }}>
      {hasImageLoaded ? (
        <animated.img
          src={thumbnailSrc}
          style={style}
          onClick={handleClick}
          className="md:cursor-pointer md:hover:scale-95 transition-transform"
          referrerPolicy="no-referrer"
        />
      ) : (
        <Skeleton className="w-full h-full">
          <BiSolidPhotoAlbum className="w-12 h-12" />
        </Skeleton>
      )}
    </div>
  );
};

export default Image;
