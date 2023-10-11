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
      className="flex flex-col p-4 rounded-xl hover-bg"
      href={url}
      target="_blank"
    >
      <img
        src={img}
        className="w-[480px] h-[270px] 2xl:w-[640px] 2xl:h-[360px]"
      />
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
  <Skeleton className="w-[480px]  2xl:w-[640px] h-[270px] 2xl:h-[360px]">
    <svg
      className="w-10 h-10 text-gray-200 dark:text-gray-600"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 20"
    >
      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
    </svg>
  </Skeleton>
);

export default Thumbnail;
