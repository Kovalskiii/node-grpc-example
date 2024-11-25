import User from '../../../schema/user.js'
import { responseMessage } from '../../../utils/responseMessage.js'

// Intended to get user from database
// In response, user will contain:
// ownerStatus field - if user which make request is actual user ownerStatus will be true in other case false.
const getUserQuery = async (filter = { _id: '' }, selectArgs = { password: 0 }, userToCheckId = '') => {
  let project = { password: 0, emailConfirmation: 0, resetPassword: 0 }

  // Intended to reset default projection
  Object.keys(selectArgs).forEach(field => {
    if (selectArgs[field] === 0) {
      project[field] = 0 // Include the field
    } else if (selectArgs[field] === 1) {
      delete project[field] // Remove the field if it exists
    }
  })

  try {
    const result = await User.aggregate([
      {
        $facet: {
          user: [
            { $match: filter },
            { $project: project },
            {
              $addFields: {
                id: '$_id',
                ownerStatus: { $eq: ['$_id', userToCheckId] },
              },
            },
          ],
        },
      },
    ])

    if (result?.[0]?.user?.length > 0) {
      return responseMessage.success('Get user success', result[0].user[0])
    } else {
      throw new Error('User not found or is deleted. Fail')
    }
  } catch (error) {
    return responseMessage.fail('Get user error', error)
  }
}

export default getUserQuery
