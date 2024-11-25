import User from '../../../schema/user.js'

// Intended to validate password
export const checkPassword = password => /^[^\s]{5,}$/.test(password)

// Intended to validate username
export const checkUsername = username => /^[a-zA-Z0-9_-]{4,19}$/.test(username)

// Intended to verify if user exist, return true if exist and false if not
export function checkIsUserExistQuery(field, fieldContent) {
  return User.findOne({ [field]: fieldContent })
    .exec()
    .then(doc => !!doc)
    .catch(() => false)
}

// Intended to validate name
export const checkName = name => /^[A-Za-z']{1,20}$/.test(name)
