const userDetailsController = require("../controllers/userDetailsController")
const countController = require("../controllers/countController")

const createUserDetails = async (params) => {
  try {
    const result = await userDetailsController.createUserDetails(params)
    const updateCount = await countController.increCount({ addCount: 1 })
    return { message: "User added successfully", result }
  } catch (error) {
    throw { errorMessage: error };
  }

}

const getUserList = async (params) => {
  try {
    const result = await userDetailsController.getUserList(params)
    return { message: "User added successfully", result }
  } catch (error) {
    throw { errorMessage: error };
  }

}

const deleteUser = async (params) => {
  try {
    const result = await userDetailsController.deleteUser(params)
    return { message: "User deleted successfully", result }
  } catch (error) {
    throw { errorMessage: error };
  }

}

const updateUser = async (params) => {
  try {
    const result = await userDetailsController.updateUser(params)
    const updateCount = await countController.increCount({ updateCount: 1 })
    return { message: "User updated successfully", result }
  } catch (error) {
    throw { errorMessage: error };
  }

}


module.exports = {
  createUserDetails,
  getUserList,
  deleteUser,
  updateUser
}