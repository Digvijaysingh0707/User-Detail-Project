const express = require('express');
const router = express.Router();
const userDetailsFunction = require("../functions/userDetailsFunction")


router.post("/add", async (req, res) => {
  try {
    const result = await userDetailsFunction.createUserDetails(req.body);
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router