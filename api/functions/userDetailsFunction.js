const userDetailsController = require("../controllers/userDetailsController")

const createUserDetails = async (params) => {
  try {
    const result = await userDetailsController.createUserDetails(params)
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