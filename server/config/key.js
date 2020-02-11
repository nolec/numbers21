if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV, "production");
  module.exports = require("./prod");
} else {
  console.log(process.env.NODE_ENV, "dev");
  module.exports = require("./dev");
}
