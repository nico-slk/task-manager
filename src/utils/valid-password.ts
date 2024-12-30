const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])([^\s]){8,16}$/;
  return passwordRegex.test(password);
};

export default { isValidPassword };
