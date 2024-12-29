const validRegexBody = (
  body: any,
  validRules: any,
): string | null | undefined => {
  let message: string | null = null

  for (const item of Object.keys(body)) {
    const regex = new RegExp(validRules[item])
    if (validRules[item]) {
      if (!regex.test(body[item])) {
        message = `'${item}' no valido`
        break
      }
    }
  }
  return message
}

export default { validRegexBody }
