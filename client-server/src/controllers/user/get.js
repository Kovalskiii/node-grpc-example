import analytics from '../../utils/analytics.js'
import { responseMessage } from '../../utils/responseMessage.js'
import { gRPCClientConnection } from '../../../server.js'

// Intended to get user data by userId
const getUser = async (req, res) => {
  const userId = req.params.userId || req.body.userId

  gRPCClientConnection.GetUser({ userId }, (error, response) => {
    if (error) {
      analytics('GET_USER_ERROR', {
        message: error.details,
        userToGetId: userId,
        controller: 'user/get',
      })

      return res.status(400).json(responseMessage.fail(error.details))
    }

    analytics('GET_USER_SUCCESS', {
      message: response.message,
      userToGetId: userId,
      controller: 'user/get',
    })

    return res.status(200).json(responseMessage.success(response.message, response.payload))
  })
}

export default getUser
