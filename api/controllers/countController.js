const Count = require("../models/countModel")

const increCount = async (query) => {
  try {
    const res = await Count.findOneAndUpdate({}, { $inc: query }, { upsert: true, new: true })
    return res
  }
  catch (err) {
    console.error(err, 'Error')
  }
}

const getCount = async () => {
  try {
    const res = await Count.find({})
    return res
  }
  catch (err) {
    console.error(err, 'Error')
  }
}

module.exports = {
  increCount,
  getCount
}