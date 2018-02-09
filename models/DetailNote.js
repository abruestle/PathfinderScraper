var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new DetailNoteSchema object
// This is similar to a Sequelize model
var DetailNoteSchema = new Schema({
  // `title` is of type String
  class: String,
  classCategory: String,
  name: String,
  // `body` is of type String
  body: String
});

// This creates our model from the above schema, using mongoose's model method
var DetailNote = mongoose.model("DetailNote", DetailNoteSchema);

// Export the DetailNote model
module.exports = DetailNote;
