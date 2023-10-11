import { VideoResponse, VideoSuccessResponse } from "./types";
import { Status } from "../../types";

export const didVideoRequestSucceed = (
  response: VideoResponse
): response is VideoSuccessResponse => response.status !== Status.Error;
