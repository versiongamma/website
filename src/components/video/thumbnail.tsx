import { BiVideoRecording } from 'react-icons/bi';

import useWaitForImgLoad from '../../hooks/use-wait-for-img-load';
import Skeleton from '../skeleton';

type Props = {
  id: string;
  title: string;
  img: string;
  publishedDate: Date;
};

const Thumbnail = ({ id, title, img, publishedDate }: Props) => {
  const url = `https://youtu.be/${id}`;
  const thumbnailLoaded = useWaitForImgLoad(img);

  if (!thumbnailLoaded) {
    return <ThumbnailSkeleton />;
  }

  return (
    <a
      className="flex flex-col p-4 rounded-xl bg-slate-600/40 hover-bg w-[320px] sm:w-[420px] md:w-[320px] xl:w-[480px] -md:m-4"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <img src={img} className="rounded-xl" />
      <h1 className="font-heading font-semibold text-lg mt-1 text-white">
        {title}
      </h1>
      <div className="flex items-end justify-end h-full">
        <p className="text-white">{publishedDate.toLocaleDateString()}</p>
      </div>
    </a>
  );
};

// https://github.com/themesberg/flowbite/blob/main/content/components/skeleton.md
export const ThumbnailSkeleton = () => (
  <Skeleton className="w-[320px] h-[180px] sm:w-[420px] sm:h-[236px] md:w-[320px] md:h-[180px] xl:w-[480px] xl:h-[270px] m-4">
    <BiVideoRecording className="w-12 h-12" />
  </Skeleton>
);

export default Thumbnail;
