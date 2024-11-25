import updateUserQuery from './helpers/updateUser.js'
import analytics from '../../utils/analytics.js'
import { responseMessage } from '../../utils/responseMessage.js'
import { checkName } from './helpers/utils.js'

// Intended to update user profile with new data
const updateProfile = async (req, res) => {
  const userId = req.body.userId
  let profileData = { ...req.body }

  delete profileData.email
  delete profileData.password

  if (!checkName(profileData.firstName)) {
    analytics('UPDATE_USER_PROFILE_FAIL', {
      message: 'Update user profile fail. First name validation fail',
      userData: profileData,
      user: userId,
      controller: 'user/updateProfile',
    })

    return res.status(400).json(responseMessage.fail('Update user profile fail. First name validation fail'))
  } else if (!checkName(profileData.lastName)) {
    analytics('UPDATE_USER_PROFILE_FAIL', {
      message: 'Update user profile fail. Last name validation fail',
      userData: profileData,
      user: userId,
      controller: 'user/updateProfile',
    })

    return res.status(400).json(responseMessage.fail('Update user profile fail. Last name validation fail'))
  }

  const updateProfileResult = await updateUserQuery(userId, profileData)

  if (!updateProfileResult.success) {
    analytics('UPDATE_USER_PROFILE_FAIL', {
      message: `Update user profile fail. ${updateProfileResult.message}`,
      userData: profileData,
      user: userId,
      controller: 'user/updateProfile',
    })

    return res.status(400).json(responseMessage.fail(`Update user profile fail. ${updateProfileResult.message}`))
  }

  analytics('UPDATE_USER_PROFILE_SUCCESS', {
    message: 'Update user profile success',
    user: userId,
    controller: 'user/updateProfile',
  })

  return res.status(200).json(responseMessage.success('Update user profile success'))
}

export default updateProfile
