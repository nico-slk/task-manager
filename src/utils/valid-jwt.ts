import { NextFunction, Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

const { SECRET_KEY } = process.env

const validJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ msg: 'Token no proporcionado' })
  }

  jwt.verify(
    token,
    SECRET_KEY || 'test',
    (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).json({ msg: 'Token no válido' })
      }
      req.body.decoded = decoded
      next()
    },
  )
}

export default { validJwt }
