import analytics from '../../utils/analytics.js'
import { responseMessage } from '../../utils/responseMessage.js'
import getUserQuery from './helpers/getUser.js'

// Intended to get user data by userId
// In response, user will contain:
// ownerStatus field - if user which make request is actual user, ownerStatus will be true in other case false.
const getUser = async (req, res) => {
  const userId = req.params.userId || req.body.userId
  const userToGetId = req.params.userToGetId || req.body.userToGetId
  const userGetResult = await getUserQuery({ _id: userToGetId }, {}, userId)

  if (!userGetResult.success) {
    analytics('GET_USER_ERROR', {
      message: userGetResult.message,
      user: userId,
      userToGetId: userToGetId,
      controller: 'user/get',
    })

    return res.status(400).json(responseMessage.fail(userGetResult.message))
  }

  analytics('GET_USER_SUCCESS', {
    message: userGetResult.message,
    user: userId,
    userToGetId: userToGetId,
    controller: 'user/get',
  })

  return res.status(200).json(responseMessage.success(userGetResult.message, { user: userGetResult.payload }))
}

export default getUser
