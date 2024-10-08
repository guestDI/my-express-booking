import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { Role, User, Blacklist } from '../models';
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userRole = await Role.findOne({ where: { name: 'user' } });
    const hashedPassword = await bcrypt.hash(password, 10);
    let token = '';

    if(!userRole) {
      return res.status(404).json({ message: 'Default role is not found' });
    }

    await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role_id: userRole.id,
    }).then((user) => {
      token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.SECRET_KEY as string,
        {
          expiresIn: '1h',
        }
      );

      // const html = pug.renderFile('views/email.pug', {
      //   verificationLink: `http://127.0.0.0:4000/verify-email?token=${token}`,
      // });

      // transporter.sendMail({
      //   to: email,
      //   from: 'notification@express-booking.com',
      //   subject: 'Verify your email',
      //   html: html,
      // });
    });

    res.status(201).json({ token });
  } catch (err) {
    console.log('e', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '1h',
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    const expiresAt = new Date((decoded as any).exp * 1000);

    await Blacklist.create({
      token,
      expiresAt: expiresAt,
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: Role,
      attributes: { exclude: ['password_hash'] },
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
