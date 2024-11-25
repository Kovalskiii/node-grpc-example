import { responseMessage } from '../../utils/responseMessage.js'
import analytics from '../../utils/analytics.js'
import getUsersQuery from './helpers/getUsers.js'

// Intended to get all users from database without 'pending' and 'deleted' status;
// Pagination: eventsLimit - limitation of shown events, pageNumber - number of page (1 - first page, 2 - second page and etc.);
// In response, every user will contain:
// ownerStatus field - if user which make request is actual user ownerStatus will be true in other case false;
const getAllUsers = async (req, res) => {
  const currentUserData = req.currentUserData
  const currentUserId = currentUserData?.id
  let showLimit = Number(req.query?.limit || req.params.limit) || 10
  let pageNumber = ((Number(req.query?.pageNumber || req.params.pageNumber) || 1) - 1) * showLimit

  const getUsersResult = await getUsersQuery(pageNumber, showLimit, {}, currentUserId)

  if (!getUsersResult.success) {
    analytics('GET_ALL_USERS_FAIL', {
      message: `Get all users fail. ${getUsersResult.message}`,
      error: getUsersResult.payload,
      user: currentUserId,
      controller: 'user/getAllByStatus',
    })

    return res.status(400).json(responseMessage.fail(`Get all users fail. ${getUsersResult.message}`))
  }

  let records
  let recordsCount

  if (!getUsersResult.payload[0].records[0]) {
    records = []
    recordsCount = 0
  } else {
    records = getUsersResult.payload[0].records
    recordsCount = getUsersResult.payload[0].totalRecords[0].value
  }

  analytics('GET_ALL_USERS_SUCCESS', {
    message: `Get all users success`,
    user: currentUserId,
    controller: 'user/getAllByStatus',
  })

  return res.status(200).json(responseMessage.success(`Get all users success`, { recordsCount, records }))
}

export default getAllUsers
