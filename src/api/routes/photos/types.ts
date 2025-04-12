import { ErrorResponse, Status } from "../../types";

export type Image = {
  src: string;
  width: number;
  height: number;
};

export type PhotosSuccessResponse = {
  data: Image[];
  status: Status.Success;
};

export type PhotosResponse = PhotosSuccessResponse | ErrorResponse;
