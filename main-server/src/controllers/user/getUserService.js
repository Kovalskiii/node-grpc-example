import getUserQuery from './helpers/getUser.js'
import analytics from '../../utils/analytics.js'
import grpc from '@grpc/grpc-js'

// gRPC service
const getUserService = async (call, callback) => {
  const { userId } = call.request
  const userGetResult = await getUserQuery({ _id: userId }, {}, userId)

  if (!userGetResult.success) {
    analytics('GET_USER_SERVICE_ERROR', {
      message: userGetResult.message,
      userToGetId: userId,
      controller: 'user/getUserService',
    })

    return callback({
      code: grpc.status.NOT_FOUND,
      details: `${userGetResult.message}. ${userGetResult.payload}`,
    })
  }

  const userData = userGetResult.payload

  callback(null, {
    message: `${userGetResult.message}`,
    payload: {
      userId: userData._id,
      ...userData,
    },
  })
}

export default getUserService
