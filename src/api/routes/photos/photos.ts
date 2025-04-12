import express from 'express';

import { Status } from '../../types';
import { logRequest } from '../../utils/logger';
import { PhotosResponse } from './types';
import data from './photos.json'

const router = express.Router();
router.get('/api/photos', async (req, res) => {
  logRequest(req);
  if (!data) {
    res.status(500);
    const response: PhotosResponse = {
      status: Status.Error,
      message: 'INTERNAL SERVER ERROR',
    };
    res.send(response);
  }

  const response: PhotosResponse = {
    status: Status.Success,
    data,
  };

  res.status(200);
  res.send(response);
});

export default router;
