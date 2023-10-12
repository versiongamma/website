import {
  SubscriberResponse,
  SubscriberSuccessResponse,
  VideoResponse,
  VideoSuccessResponse,
} from "./types";
import { Status } from "../../types";

export const didVideoRequestSucceed = (
  response: VideoResponse
): response is VideoSuccessResponse => response.status !== Status.Error;

export const didSubscriberRequestSucceed = (
  response: SubscriberResponse
): response is SubscriberSuccessResponse => response.status !== Status.Error;
