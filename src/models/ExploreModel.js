const mongoose = require('mongoose');

const ExploreSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ExploreModel = mongoose.model('Explore', ExploreSchema);

module.exports = ExploreModel;
