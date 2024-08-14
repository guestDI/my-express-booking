import { User } from '../models';
import express, { Response, Request } from 'express';
const router = express.Router();
import authenticateToken from '../middleware/authMiddleware';

interface UserRequest extends Request{
  user?: User;
}

router.get('/verify-email', authenticateToken, async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(403).send('Invalid token');
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.isVerified) {
      return res.status(400).send('Email is already verified');
    }

    user.isVerified = true;
    await user.save();

    res.send('Your email has been verified successfully!');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

export default router;
