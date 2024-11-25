import { responseMessage } from '../../../utils/responseMessage.js'
import analytics from '../../../utils/analytics.js'
import { v4 as uuidV4 } from 'uuid'
import createUserQuery from './createUser.js'
import createUserValidationQuery from './createValidation.js'
import { checkIsExistQuery } from '../../helpers/utils.js'
import User from '../../../schema/user.js'

// Dedicated to create and add users to database (with 'user' role)
const createUser = async (req, res) => {
  const user = {
    _id: uuidV4(),
    username: req.body.username?.trim().toLowerCase(),
    password: req.body.password,
  }

  const registerValidationResult = await createUserValidationQuery(user)

  if (!registerValidationResult.success) return res.status(400).json(registerValidationResult)

  const isUserUsernameExists = await checkIsExistQuery(User, { username: user.username })

  // Check if user with such username already exist in database
  if (isUserUsernameExists) {
    analytics('CREATE_USER_FAIL', {
      message: 'User was not created. Such username is already occupied',
      userData: { ...user, password: null },
      controller: 'user/create',
    })

    return res.status(400).json(responseMessage.fail('User was not created. Such username is already occupied'))
  }

  const createdUserResult = await createUserQuery(user)

  if (!createdUserResult.success) {
    analytics('CREATE_USER_FAIL', {
      message: createdUserResult.message,
      error: createdUserResult.payload.message,
      userData: { ...user, password: null },
      controller: 'user/create',
    })

    return res.status(400).json(responseMessage.fail(createdUserResult.message))
  }

  analytics('CREATE_USER_SUCCESS', {
    message: createdUserResult.message,
    userData: { ...user, password: null },
    controller: 'user/create',
  })

  return res.status(201).json(responseMessage.success(createdUserResult.message, { userId: user._id }))
}

export default createUser
