const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrancheAgeSchema = new Schema({
    ageMin: Number,
    ageMax: Number
});

const TrancheAge = mongoose.model('TrancheAge', TrancheAgeSchema);

module.exports = TrancheAge;
