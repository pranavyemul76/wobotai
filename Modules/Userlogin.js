const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Shema = mongoose.Schema;
const Usershema = new Shema(
  {
    id: {
      type: mongoose.Types.ObjectId,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
Usershema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
module.exports = mongoose.model("user", Usershema);
