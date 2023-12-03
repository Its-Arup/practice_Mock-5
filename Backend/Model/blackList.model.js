const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
  blackList: String,
});

const BlackList_Token = mongoose.model("blackList", blackListSchema);

module.exports = {
  BlackList_Token,
};
