import User from '../../../schema/user.js'
import bcrypt from 'bcryptjs'
import { responseMessage } from '../../../utils/responseMessage.js'

// Intended to hash user password
const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

// Intended to create new user in database
const createUserQuery = async user => {
  const newUser = new User({
    _id: user._id,
    username: user.username,
    password: hashPassword(user.password),
    role: user.role,
    ...(user.firstName ? { firstName: user.firstName } : {}),
    ...(user.lastName ? { lastName: user.lastName } : {}),
  })

  try {
    await newUser.save()
    return responseMessage.success('Create user success')
  } catch (error) {
    return responseMessage.fail('Create user error', error)
  }
}

export default createUserQuery
