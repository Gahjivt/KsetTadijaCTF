export function findInputError(errors, name) {
  const filtered = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce((cur, name) => {
      return Object.assign(cur, { error: errors[name] })
    }, {})
  return filtered
}
