import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Role from '../models/role';
import Blacklist from '../models/blacklist';

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

export const authenticateToken = async (req, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const blacklistedToken = await Blacklist.findOne({ where: { token } });

    if (blacklistedToken) {
      return res.sendStatus(403);
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedToken;
    const user = await User.findByPk(decoded.id, {
      include: [Role],
    });

    if (!user) {
      return res.sendStatus(403);
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.Role.name,
    };
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export default authenticateToken;
