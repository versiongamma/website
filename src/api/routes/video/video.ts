import express from 'express';

import { Status } from '../../types';
import { logRequest } from '../../utils/logger';
import {
  SubscriberResponse,
  VideoResponse,
  YoutubeApiPlaylistResponse,
} from './types';

const FETCH_VIDEOS_IN_ANALYSIS_PLAYLIST = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLAI9kflqAm9GP2UUYp2wHt6YZd00b-fpX&key=${process.env.GOOGLE_API_KEY}`;
const FETCH_VIDEOS_IN_REVIEWS_PLAYLIST = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLAI9kflqAm9FyXSKh3OoEyySD8Tzk1xGk&key=${process.env.GOOGLE_API_KEY}`;
const FETCH_VIDEOS_IN_VIDEOGRAPHY_PLAYLIST = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLAI9kflqAm9E0d_ExQ2tYdk9UwdD2PKD4&key=${process.env.GOOGLE_API_KEY}`;

const FETCH_SUBSCRIBER_COUNT = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCTxitBg-WrN_xTHKMbAzcIA&key=${process.env.GOOGLE_API_KEY}`;

const router = express.Router();
router.get('/api/videos/analysis', async (req, res) => {
  logRequest(req);
  const [analysisData, reviewsData] = await Promise.all([
    fetch(FETCH_VIDEOS_IN_ANALYSIS_PLAYLIST)
      .then((res) => res.json())
      .then((videos) => videos),
    fetch(FETCH_VIDEOS_IN_REVIEWS_PLAYLIST)
      .then((res) => res.json())
      .then((videos) => videos),
  ]);

  if (!analysisData || !reviewsData) {
    res.status(500);
    const response: VideoResponse = {
      status: Status.Error,
      message: 'INTERNAL SERVER ERROR',
    };
    res.send(response);
  }

  const unsortedItems: YoutubeApiPlaylistResponse['items'] = [
    ...analysisData.items,
    ...reviewsData.items,
  ];
  const data = {
    items: unsortedItems.sort(
      (a, b) =>
        new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime()
    ),
  };

  const response: VideoResponse = {
    status: Status.Success,
    data,
  };

  res.status(200);
  res.send(response);
});

router.get('/api/videos/videography', async (req, res) => {
  logRequest(req);
  const data = await fetch(FETCH_VIDEOS_IN_VIDEOGRAPHY_PLAYLIST)
    .then((res) => res.json())
    .then((videos) => videos);

  if (!data) {
    res.status(500);
    const response: VideoResponse = {
      status: Status.Error,
      message: 'INTERNAL SERVER ERROR',
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

router.get('/api/videos/versiongamma/subscribers', async (req, res) => {
  logRequest(req);
  const data = await fetch(FETCH_SUBSCRIBER_COUNT)
    .then((res) => res.json())
    .then((videos) => videos);

  if (!data) {
    res.status(500);
    const response: SubscriberResponse = {
      status: Status.Error,
      message: 'INTERNAL SERVER ERROR',
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
