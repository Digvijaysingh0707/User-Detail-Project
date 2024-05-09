const express = require("express")
const router = express.Router()
const countController = require("../controllers/countController")

router.get("/get", async (req, res) => {
  try {
    const result = await countController.getCount()
    res.status(200).json(result)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router