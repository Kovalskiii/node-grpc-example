import analytics from '../../../utils/analytics.js'
import { responseMessage } from '../../../utils/responseMessage.js'
import { checkPassword, checkUsername } from '../helpers/utils.js'

// Intended to validate user data for create
const createUserValidationQuery = async user => {
  if (!checkPassword(user.password)) {
    analytics('CREATE_USER_FAIL', {
      message: 'Wrong password format',
      userData: { ...user, password: null },
      controller: 'user/create/createValidation',
    })

    return responseMessage.fail('Wrong password format')
  } else if (!checkUsername(user.username)) {
    if (user.username.length < 5) {
      analytics('CREATE_USER_FAIL', {
        message: 'User was not created. Incorrect username format. Minimum 5 symbols',
        userData: { ...user, password: null },
        controller: 'user/create/createValidation',
      })

      return responseMessage.fail('User was not created. Incorrect username format. Minimum 5 symbols')
    } else if (user.username.length > 20) {
      analytics('CREATE_USER_FAIL', {
        message: 'User was not created. Incorrect username format. Minimum 20 symbols',
        userData: { ...user, password: null },
        controller: 'user/create/createValidation',
      })

      return responseMessage.fail('User was not created. Incorrect username format. Minimum 20 symbols')
    } else {
      analytics('CREATE_USER_FAIL', {
        message: 'User was not created. Incorrect username format',
        userData: { ...user, password: null },
        controller: 'user/create/createValidation',
      })

      return responseMessage.fail('User was not created. Incorrect username format')
    }
  } else return responseMessage.success('Create user validation success')
}

export default createUserValidationQuery
