import User from '../../../schema/user.js'
import { responseMessage } from '../../../utils/responseMessage.js'

// Intended to update user by id and delete some fields if are set delValues object, by default delValues is empty object
const updateUserQuery = async (userId = '', setValues = {}, delValues = {}) => {
  try {
    const updateResult = await User.findOneAndUpdate(
      { _id: userId },
      { $set: setValues, $unset: delValues },
      { returnDocument: 'after', runValidators: true }
    ).exec()

    if (updateResult) {
      return responseMessage.success('Update user success', updateResult)
    } else {
      throw new Error('User not found. Fail')
    }
  } catch (error) {
    return responseMessage.fail('Update user error', error)
  }
}

export default updateUserQuery
