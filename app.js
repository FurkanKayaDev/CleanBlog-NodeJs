const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const app = express();

//connect DB
mongoose.connect("mongodb://localhost/clean-blog-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static("public"));
// eklenen verileri json formatında almak için bunlar kullanılır
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get("/", async (req, res) => {
  // db deki tüm postları al ve posts değişkenine atayıp index.ejs ye gönder
  const posts = await Post.find({});
  res.render("index", { posts });
});

// asenkron olarak çalıştırılması gerek!
app.get("/post/:id", async (req, res) => {
  // :id ile gelen id yi al
  const id = req.params.id;
  const post = await Post.findById(id);
  res.render("post", { post });
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.get("/post", (req, res) => {
  res.render("post");
});
// add action ile gelen verileri db ye Post modeli ile kaydet
app.post("/add", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
