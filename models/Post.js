const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Şema oluşturuyoruz
const PhotoSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
// burada ki posts db de ki varsa posts collection'a ekle yoksa oluştur
const Post = mongoose.model("Post", PhotoSchema);

module.exports = Post;
