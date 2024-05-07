const userDetailsController = require("../controllers/userDetailsController")

const createUserDetails = async (params) => {
  try {
    const result = await userDetailsController.createUserDetails(params)
    return { message: "User added successfully", result }
  } catch (error) {
    throw { errorMessage: error };
  }

}


module.exports = {
  createUserDetails
}