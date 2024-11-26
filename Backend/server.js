
const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const Todo = require("./models/todomodel.js")
const todoRoutes = require("./routes/todoRoutes.js")
const cors = require("cors")

dotenv.config();
console.log(`port at ${process.env.PORT}`);

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", }))


mongoose.connect(process.env.URL).then(() => {
  console.log("connected with mongo")
}).catch(() => {
  console.log("error connecting DB");
})

app.use(todoRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})