import analytics from '../../utils/analytics.js'
import createUserQuery from '../user/create/createUser.js'
import { v4 as uuidV4 } from 'uuid'
import User from '../../schema/user.js'
import { checkIsExistQuery } from '../helpers/utils.js'
import { responseMessage } from '../../utils/responseMessage.js'

// Intended to create default user record in database with first server start
const createDefaultUserQuery = async () => {
  const isExistLocationResult = await checkIsExistQuery(User, { role: 'admin' }) // Ensure that in database exist only 1 record

  const user = {
    _id: 'e4dab395-c140-4b7f-b289-e2cf008dc563', //uuidV4(),
    username: 'sometestusername',
    password: '^2435226dfgdexIm3',
    role: 'admin',
    firstName: 'Test',
    lastName: 'User',
  }

  if (!isExistLocationResult) {
    const createUserResult = await createUserQuery(user)

    if (createUserResult.success) {
      analytics('CREATE_DEFAULT_USER_SUCCESS', {
        message: createUserResult.message,
        userId: user._id,
        controller: 'defaults/createDefaultUser',
      })

      return responseMessage.fail(createUserResult.message)
    } else {
      analytics('CREATE_DEFAULT_USER_FAIL', {
        message: createUserResult.message,
        error: createUserResult.payload,
        userId: user._id,
        controller: 'defaults/createDefaultUser',
      })

      return responseMessage.success(createUserResult.message)
    }
  }
}

export default createDefaultUserQuery
