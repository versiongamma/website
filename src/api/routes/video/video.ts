import express from "express";

import { Status } from "../../types";
import { logRequest } from "../../utils/logger";
import { SubscriberResponse, VideoResponse } from "./types";

const FETCH_VIDEOS_BY_UPLOAD = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUTxitBg-WrN_xTHKMbAzcIA&key=${process.env.GOOGLE_API_KEY}`;
const FETCH_SUBSCRIBER_COUNT = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCTxitBg-WrN_xTHKMbAzcIA&key=${process.env.GOOGLE_API_KEY}`;

const router = express.Router();
router.get("/api/videos/versiongamma", async (req, res) => {
  logRequest(req);
  const data = await fetch(FETCH_VIDEOS_BY_UPLOAD)
    .then((res) => res.json())
    .then((videos) => videos);

  if (!data) {
    res.status(500);
    const response: VideoResponse = {
      status: Status.Error,
      message: "INTERNAL SERVER ERROR",
    };
    res.send(response);
  }

  const response: VideoResponse = {
    status: Status.Success,
    data,
  };

  res.status(200);
  res.send(response);
});

router.get("/api/videos/versiongamma/subscribers", async (req, res) => {
  logRequest(req);
  const data = await fetch(FETCH_SUBSCRIBER_COUNT)
    .then((res) => res.json())
    .then((videos) => videos);

  if (!data) {
    res.status(500);
    const response: SubscriberResponse = {
      status: Status.Error,
      message: "INTERNAL SERVER ERROR",
    };
    res.send(response);
  }

  const response: SubscriberResponse = {
    status: Status.Success,
    data,
  };

  res.status(200);
  res.send(response);
});

export default router;
