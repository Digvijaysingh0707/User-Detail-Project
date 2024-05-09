const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userDetailsRoutes = require("./routes/userDetailsRoutes")
const countDetailsRoutes = require("./routes/countRoutes")
const app = express();

app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 3001;
mongoose.connect("mongodb+srv://Digvijay0707:extra@nodeexpressprojects.x9jbbzs.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use("/user", userDetailsRoutes)
app.use("/count", countDetailsRoutes)


