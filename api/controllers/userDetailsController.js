const UserDetails = require("../models/userDetailsModel")

const createUserDetails = async (params) => {
  const result = await UserDetails.create(params)
  return result
}

const getUserList = async (params) => {
  let { pageNo, count } = params
  let query = {}
  let sort = { updatedAt: -1 }
  const result = await UserDetails.find(query).sort(sort).skip(pageNo * count).limit(count).lean()
  return result
}

const deleteUser = async (req) => {
  let _id = req.params["id"];
  const result = await UserDetails.findByIdAndDelete({ _id })
  return result
}

const updateUser = async (params) => {
  let { firstName, lastName, email } = params
  let query = {}
  let update = {};

  let options = { new: true }
  query._id = params?._id

  if (firstName) {
    update.firstName = firstName
  }

  if (lastName) {
    update.lastName = lastName
  }

  if (email) {
    update.email = email
  }

  const result = await UserDetails.findOneAndUpdate(query, update, options)
  return result
}

module.exports = {
  createUserDetails,
  getUserList,
  deleteUser,
  updateUser
}