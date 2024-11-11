import express from 'express';

import { Status } from '../../types';
import { logRequest } from '../../utils/logger';
import { PhotosResponse } from './types';

const FETCH_IMAGES_URL = 'https://api.imgur.com/3/album/JKELiQA';

const router = express.Router();
router.get('/api/photos', async (req, res) => {
  logRequest(req);
  const data = await fetch(FETCH_IMAGES_URL, {
    headers: {
      Authorization: 'CLIENT-ID ' + process.env.IMGUR_CLIENT_SECRET,
    },
    referrer: '',
    referrerPolicy: 'no-referrer',
  })
    .then((res) => res.json())
    .then((photos) => photos);

  const messageString = data.status === 200 ? `${data.data.images.length} images fetched` : data.message;
  console.log(` - Imgur API responded with status [${data.status}]: ${messageString}`)

  if (!data) {
    res.status(500);
    const response: PhotosResponse = {
      status: Status.Error,
      message: 'INTERNAL SERVER ERROR',
    };
    res.send(response);
  }

  if (data.status !== 200) {
    res.send({ status: Status.Success, data: { images: [] } });
  }

  const response: PhotosResponse = {
    status: Status.Success,
    data: data.data,
  };

  res.status(200);
  res.send(response);
});

export default router;
