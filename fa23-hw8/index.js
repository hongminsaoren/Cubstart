const express = require("express")
const app = express()

var cors = require("cors")
app.use(cors())

const mongoose = require("mongoose")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connect().catch(err => console.log(err))

async function connect() {
    await mongoose.connect("mongodb+srv://ruichenlee:e5FvlUKNaN0VU618@cluster0.satdz6d.mongodb.net/") // QUESTION 2. Paste your connection string here, but replace <password> with your password.
    // Don't forget the quotation marks! Do not include the triangle brackets <> around your password.
    // It should look something like this: "mongodb+srv://jessican1212:my_password@cluster0.5fwyzvq.mongodb.net/"
    console.log("Successfully connected to MongoDB")
}

const animeSchema = new mongoose.Schema({
    title: String,
    year: Number,
    characters: [String]
});

const Anime = mongoose.model("Animes", animeSchema)

app.post("/new", async (req, res) => {
    const newAnime = new Anime({
        title: req.body.title,
        year: req.body.year,
        characters: req.body.characters
    })
    await newAnime.save()
    res.send(newAnime)
})

app.get("/animes", async (req, res) => {
    const animes = await Anime.find()
    res.send(animes)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})