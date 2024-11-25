// Intended to validate email
export const checkEmail = email => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email
  )
}

// Delay function using Promise
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Capitalize first letter
export function capitalizeFirstLetter(string) {
  if (!string) return string
  string = string.toLowerCase()
  return string[0].toUpperCase() + string.substring(1)
}

// Intended to check if word exist inside string
export const checkWordInString = (str, word) => {
  if (!str || !word.length) {
    return false
  }
  const lowerStr = str.toLowerCase()
  const lowerWord = word.toLowerCase()
  return lowerStr.indexOf(lowerWord) !== -1
}

// Intended to verify if one record in db exist
export const checkIsExistQuery = (schemaName, filter = {}) => {
  return schemaName
    .findOne(filter)
    .exec()
    .then(doc => !!doc)
    .catch(() => false)
}
