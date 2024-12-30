import { Router } from 'express';
import { body } from 'express-validator';
import AuthService from '../services/auth.service';
import { ValidateRequest, ValidEmail, ValidPassword } from '../utils';

const { signIn, registerUser } = AuthService;
const { validateRequest } = ValidateRequest;
const { isValidEmail } = ValidEmail;
const { isValidPassword } = ValidPassword;

const router = Router();

const emailValidation = body('email')
  .isEmail()
  .custom(isValidEmail)
  .withMessage('El correo electrónico debe tener un formato válido');

const passwordValidation = body('password')
  .isLength({ min: 8, max: 16 })
  .withMessage('La contraseña debe tener entre 8 y 16 caracteres')
  .custom(isValidPassword)
  .withMessage(
    'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  );

const usernameValidation = body('nickname')
  .optional()
  .isString()
  .withMessage('El nombre de usuario debe ser un texto');

router.post(
  '/login',
  [emailValidation, passwordValidation, validateRequest],
  signIn,
);
router.post(
  '/register',
  [usernameValidation, emailValidation, passwordValidation, validateRequest],
  registerUser,
);

export default router;
