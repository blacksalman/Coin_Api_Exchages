const mongoose = require('mongoose');

const exchangesSchema = new mongoose.Schema({
  exchange_id: String,
  website: String,
  name: String,
  data_start: String,
  data_end: String,
  data_quote_start: String,
  data_quote_end: String,
  data_symbols_count: String,
  volume_1hrs_usd: String,
  volume_1day_usd: String,
  volume_1mth_usd: String,
});

module.exports = mongoose.model('exchanges', exchangesSchema);