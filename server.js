const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString:'postgres://kzopccofbopokk:5c246d1ff27fca4f950f5c8421212865103343f0e04853a973d8ffb311c1bce0@ec2-44-206-214-233.compute-1.amazonaws.com:5432/d67u2tg1k5dg8f',
    ssl: true,
  }
});

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {res.send("it is working")})
app.post("/signin", signin.handleSignin(db, bcrypt))
app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db)})
app.put("/image", (req, res) => { image.handleImage(req, res, db)})
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
