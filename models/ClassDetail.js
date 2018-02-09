var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ClassDetailSchema = new Schema({
  // `title` is required and of type String
  class: {
    type: String,
    required: true,
    index: true
  },
  classCategory: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the ClassDetail with an associated Note
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "DetailNote"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var ClassDetail = mongoose.model("ClassDetail", ClassDetailSchema);

// Export the ClassDetail model
module.exports = ClassDetail;
