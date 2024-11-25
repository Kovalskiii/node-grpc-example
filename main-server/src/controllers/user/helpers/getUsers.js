import { responseMessage } from '../../../utils/responseMessage.js'
import User from '../../../schema/user.js'

// Intended to get all (active) users from database
// If pageNum and pageLimit are undefined - all users will be returned (without pagination);
// In response, every user will contain:
// ownerStatus field - if user which make request is actual user ownerStatus will be true in other case false.
const getUsersQuery = async (pageNum, pageLimit, filter = {}, userToCheckId = '') => {
  let pipeline = [
    { $sort: { createdAt: -1 } },
    {
      $project: {
        emailConfirmation: 0,
        resetPassword: 0,
        otherFiles: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    {
      $addFields: {
        ownerStatus: { $eq: ['$_id', userToCheckId] },
      },
    },
  ]

  if (pageLimit !== 0 && pageLimit != null && !isNaN(pageLimit)) {
    pipeline.push({ $skip: pageNum }, { $limit: pageLimit })
  }

  try {
    const records = await User.aggregate([
      { $match: filter },
      {
        $facet: {
          totalRecords: [{ $count: 'value' }],
          records: [...pipeline],
        },
      },
    ])
    return responseMessage.success('Get users success', records)
  } catch (error) {
    return responseMessage.fail('Get users fail', error)
  }
}

export default getUsersQuery
