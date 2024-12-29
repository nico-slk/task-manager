const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])([^\s]){8,16}$/
  if (!passwordRegex.test(password)) {
    throw new Error('La contraseña no cumple con los requisitos de seguridad')
  }
  return true
}

export default { isValidPassword }
