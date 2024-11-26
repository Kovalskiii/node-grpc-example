import analytics from '../../utils/analytics.js'
import fs from 'fs'
import { fileTypeFromFile } from 'file-type'

export const shareFilePathPublic = 'public'
export const shareFilePathPrivate = 'private'
export const uploadFilePathPublic = '../storage/' + shareFilePathPublic
export const uploadFilePathPrivate = '../storage/' + shareFilePathPrivate

// gRPC service
const getUserFileService = async call => {
  const { userId, fileSrc } = call.request

  if (!userId) {
    analytics('GET_USER_FILE_FAIL', {
      message: 'Get user file fail. userId is not provided',
      user: userId,
      controller: 'getUserFileService',
    })

    const error = new Error('Get user file fail. userId is not provided')
    call.emit('error', error)
  }

  if (!fileSrc) {
    analytics('GET_USER_FILE_FAIL', {
      message: 'Get user file fail. fileSrc is not provided',
      user: userId,
      controller: 'getUserFileService',
    })

    const error = new Error('Get user file fail. fileSrc is not provided')
    call.emit('error', error)
  }

  let fullFilePath

  // Replace url beginning to '../storage/public' or '../storage/private'
  if (fileSrc.includes('public')) {
    fullFilePath = fileSrc.replace(/.*?\/?public/, uploadFilePathPublic)
  } else if (fileSrc.includes('private')) {
    fullFilePath = fileSrc.replace(/.*?\/?private/, uploadFilePathPrivate)
  } else {
    fullFilePath = fileSrc
  }

  if (fs.existsSync(fullFilePath)) {
    const fileStatus = fs.statSync(fullFilePath)
    const fileSize = fileStatus.size
    const fileType = await fileTypeFromFile(fullFilePath)
    const fileStream = fs.createReadStream(fullFilePath)

    if (!fileType?.mime) {
      analytics('GET_USER_FILE_FAIL', {
        message: 'Get user file fail. Something wrong with file extension',
        fileSrc: fileSrc,
        user: userId,
        controller: 'user/getUserFileService',
      })

      const error = new Error('Get user file fail. Something wrong with file extension')
      call.emit('error', error)
    }

    const headers = {
      'Content-Length': fileSize,
      'Content-Type': fileType?.mime,
    }

    // Listen for errors on the file stream
    fileStream.on('error', error => {
      analytics('GET_USER_FILE_FAIL', {
        message: `Get user file fail. Error reading file: ${error.message}`,
        error: error.message,
        fileSrc: fileSrc,
        user: userId,
        controller: 'user/getUserFileService',
      })

      call.emit('error', error)
    })

    // Listen for the end event on the response stream
    fileStream.on('end', () => {
      analytics('GET_USER_FILE_SUCCESS', {
        message: `Get user file success. File: ${fileSrc}`,
        fileSrc: fileSrc,
        user: userId,
        controller: 'user/getUserFileService',
      })

      call.end()
    })

    fileStream.on('data', chunk => {
      call.write({ data: chunk, fileMimeType: fileType?.mime, fileSize: fileSize })
    })
  } else {
    analytics('GET_USER_FILE_FAIL', {
      message: 'Get user file fail. File not found',
      fileSrc: fileSrc,
      user: userId,
      controller: 'user/getUserFileService',
    })

    const error = new Error('Get user file fail. File not found')
    call.emit('error', error)
  }
}

export default getUserFileService
