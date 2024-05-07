const UserDetails = require("../models/userDetailsModel")

const createUserDetails = async (params) => {
  const result = await UserDetails.create(params)
  return result
}

module.exports = {
  createUserDetails
}