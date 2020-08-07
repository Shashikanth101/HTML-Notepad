module.exports = {
  "DB_URI": process.env.DB_URI || "mongodb://localhost:27017/noteDB",
  "ACCESS_TOKEN_SECRET": process.env.ACCESS_TOKEN_SECRET,
  "HOST": process.env.HOST || "http://localhost:3000"
}