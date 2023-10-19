import { PhotosResponse, PhotosSuccessResponse } from "./types";
import { Status } from "../../types";

export const didPhotosRequestSucceed = (
  response: PhotosResponse
): response is PhotosSuccessResponse => response.status !== Status.Error;
