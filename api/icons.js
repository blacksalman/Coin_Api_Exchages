const mongoose = require('mongoose');

const iconsSchema = new mongoose.Schema({
  exchange_id: String,
  url: String
});

module.exports = mongoose.model('icons', iconsSchema);
