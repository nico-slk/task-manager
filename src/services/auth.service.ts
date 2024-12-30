import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/constants';
import { UserSchema } from '../models';

const { SECRET_KEY } = config;

class AuthService {
  constructor() {}

  signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'El email y la contraseña son obligatorios' });
      }

      const user = await UserSchema.findOne({ email }).select('+password');

      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY || 'test');

      const { password: _, ...userWithoutPassword } = user.toObject();

      res.status(200).json({ user: userWithoutPassword, token });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({
          message: 'Error inesperado del servidor',
          error: err.message,
        });
      } else {
        res.status(500).json({ message: 'Error inesperado del servidor' });
      }
    }
  };

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const { nickname, email, password } = req.body;

    try {
      if (!nickname || !email || !password) {
        return res
          .status(400)
          .json({ message: 'Todos los campos son obligatorios.' });
      }

      const existingUser = await UserSchema.findOne({ email });

      if (existingUser) {
        return res
          .status(403)
          .json({ message: 'Este correo ya está registrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new UserSchema({
        nickname,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        user: {
          id: newUser._id,
          nickname: newUser.nickname,
          email: newUser.email,
        },
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: 'Hubo un error al intentar registrar al usuario.',
        error: error.message,
      });
    }
  };
}

export default new AuthService();
