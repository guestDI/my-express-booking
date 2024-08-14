import { Response, NextFunction, Request } from "express";

const checkRole = (requiredRole: string) => {
  return (req, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You do not have the required role' });
    }

    next();
  };
}
export default checkRole;
