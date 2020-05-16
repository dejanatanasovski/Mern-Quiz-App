const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config({path:'./.env'});

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"));

app.get("/", (req,res) => {
    res.status(200).json({
        message: "All working Fine"
    })
});
app.get("/allPlayers", async (req,res) => {
    const allPlayers = await User.find();
    console.log(allPlayers)
    res.status(200).json({
        resulth: allPlayers
    })
});
app.post("/register", async (req,res) => { 
    console.log(req.body);
    console.log("inside register");
    const newUser = await User.create({
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password,
        score: req.body.score,
        timerTime: req.body.timerTime / 1000
    })

    console.log(newUser);
    res.status(200).json({
        message:'User Registered'
    })
})
app.listen(7000, (req, res) => {
    console.log("Server is running on port 7000");
});