import { ErrorResponse, Status } from "../../types";

type YoutubeApiThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type YoutubeApiPlaylistResponse = {
  items: {
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: YoutubeApiThumbnail;
        medium: YoutubeApiThumbnail;
        high: YoutubeApiThumbnail;
        standard: YoutubeApiThumbnail;
        maxres: YoutubeApiThumbnail;
      };
      channelTitle: string;
      playlistId: string;
      position: number;
      resourceId: {
        videoId: string;
      };
    };
  }[];
};

export type VideoSuccessResponse = {
  status: Status.Success;
  data: YoutubeApiPlaylistResponse;
};

export type VideoResponse = VideoSuccessResponse | ErrorResponse;

export type ChannelStats = {
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
};

export type YoutubeApiChannelStatisticsResponse = {
  items: {
    id: string;
    statistics: ChannelStats;
  }[];
};

export type SubscriberSuccessResponse = {
  status: Status.Success;
  data: YoutubeApiChannelStatisticsResponse;
};

export type SubscriberResponse = SubscriberSuccessResponse | ErrorResponse;
