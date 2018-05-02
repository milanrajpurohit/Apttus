/*******************************
 AGREEMENT SCHEMA INITIALISATION
 *******************************/
const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const agreementSchema = new Schema({

    name:       { type: String },
    startDate:  { type: Date },
    endDate:    { type: Date },
    value:      Number,
    status:     {type: String, Enum: ["Active", "Renewed", "Amended"]},
    createdOn:  { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }

});

const Agreements = mongoose.model('agreements', agreementSchema);

module.exports = {
    Agreements
}

