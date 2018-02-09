var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ClassNoteSchema object
// This is similar to a Sequelize model
var ClassNoteSchema = new Schema({
  // Name of what it is associated with
  name: String,
  category: String,
  title: String,
  //If later Details and Class notes are combines, we would add 'type'
  body: String
});

// This creates our model from the above schema, using mongoose's model method
var ClassNote = mongoose.model("ClassNote", ClassNoteSchema);

// Export the ClassNote model
module.exports = ClassNote;
