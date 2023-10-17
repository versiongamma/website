import { BiVideoRecording } from "react-icons/bi";

import useWaitForImgLoad from "../../hooks/use-wait-for-img-load";
import Skeleton from "../skeleton";

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
      className="flex flex-col p-4 rounded-xl hover-bg w-[320px] xl:w-[480px] 2xl:w-[640px]"
      href={url}
      target="_blank"
    >
      <img src={img} />
      <h1 className="font-heading font-semibold text-lg mt-1 text-white 2xl:text-2xl 2xl:mt-2">
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
  <Skeleton className="w-[320px] h-[180px] xl:w-[480px] xl:h-[270px] 2xl:w-[640px] 2xl:h-[360px]">
    <BiVideoRecording className="w-12 h-12" />
  </Skeleton>
);

export default Thumbnail;
