import express from 'express';
const router = express.Router();

router.get('/dashboard', function (_, res) {
  res.send('respond with a resource');
});

export default router;
