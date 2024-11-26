import analytics from '../../utils/analytics.js'
import { responseMessage } from '../../utils/responseMessage.js'
import { gRPCClientConnection } from '../../../server.js'

// Intended to get file
const getUserFile = async (req, res) => {
  const userId = req.params.userId || req.body.userId
  const fileSrc = req.body.fileSrc
  let headersSet = false

  const call = gRPCClientConnection.GetUserFile({ userId, fileSrc })

  call.on('error', error => {
    analytics('GET_USER_FILE_ERROR', {
      message: `Get user file error. ${error.details}`,
      userToGetId: userId,
      controller: 'file/getUserFile',
    })

    return res.status(400).json(responseMessage.fail(`Get user file error. ${error.details}`))
  })

  call.on('data', chunk => {
    if (!headersSet && chunk.fileMimeType && chunk.fileSize) {
      // Set headers on the HTTP response
      res.set({
        'Content-Type': chunk.fileMimeType,
        'Content-Length': chunk.fileSize,
      })
      headersSet = true
    }
    res.write(chunk.data)
  })

  call.on('end', e => {
    analytics('GET_USER_FILE_SUCCESS', {
      message: 'Get user file success',
      userToGetId: userId,
      controller: 'user/getUserFile',
    })

    res.end()
  })

  call.on('status', function (status) {})
}

export default getUserFile
