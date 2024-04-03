import { YoutubeApiPlaylistResponse } from '../../api/routes/video/types';
import Thumbnail, { ThumbnailSkeleton } from './thumbnail';

const THUMBNAIL_SKELETON_COUNT = 20;

type Props = {
  videos: YoutubeApiPlaylistResponse | null;
};

const VideoList = ({ videos }: Props) => (
  <div className="md:w-1/2 overflow-y-auto no-scrollbar mt-2">
    <span
      className="m-2 md:grid md:grid-cols-video-thumbnails-sm xl:grid-cols-video-thumbnails-md
    gap-6 justify-center "
    >
      {videos
        ? videos.items.map(
            ({
              snippet: {
                title,
                thumbnails: {
                  maxres: { url },
                },
                publishedAt,
                resourceId: { videoId },
              },
            }) => (
              <Thumbnail
                key={videoId}
                id={videoId}
                img={url}
                title={title}
                publishedDate={new Date(publishedAt)}
              />
            )
          )
        : [...Array(THUMBNAIL_SKELETON_COUNT)].map((_e, i) => (
            <ThumbnailSkeleton key={i} />
          ))}
    </span>
  </div>
);

export default VideoList;
