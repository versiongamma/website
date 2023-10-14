import { ErrorResponse, Status } from "../../types";

export type ImgurApiResponse = {
  images: {
    id: string;
    width: number;
    height: number;
    link: string;
  }[];
};

export type PhotosSuccessResponse = {
  data: ImgurApiResponse;
  status: Status.Success;
};

export type PhotosResponse = PhotosSuccessResponse | ErrorResponse;
