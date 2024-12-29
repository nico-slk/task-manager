import { Router } from 'express'
import { body } from 'express-validator'
import AuthService from '../services/auth.service'
import { ValidJWT, ValidateRequest } from '../utils'

const { signIn, registerUser } = AuthService
const { validJwt } = ValidJWT
const { validateRequest } = ValidateRequest

const router = Router()

const emailValidation = body('email')
  .isEmail()
  .withMessage('El correo electrónico debe tener un formato válido')
  .normalizeEmail()

const passwordValidation = body('password')
  .isLength({ min: 8, max: 16 })
  .withMessage('La contraseña debe tener entre 8 y 16 caracteres')
  .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/)
  .withMessage(
    'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  )

const usernameValidation = body('username')
  .optional()
  .isString()
  .withMessage('El nombre de usuario debe ser un texto')

router.post(
  '/signin',
  [emailValidation, passwordValidation, validJwt, validateRequest],
  signIn,
)
router.post(
  '/register',
  [
    emailValidation,
    passwordValidation,
    usernameValidation,
    validJwt,
    validateRequest,
  ],
  registerUser,
)

export default router
