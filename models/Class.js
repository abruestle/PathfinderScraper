var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ClassSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
    required: true,
    index: true
  },
  category: {
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
  // This allows us to populate the Class with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "ClassNote"
  }
});

ClassSchema.index({category: 1, name: 1}, {unique: true});

// This creates our model from the above schema, using mongoose's model method
var Class = mongoose.model("Class", ClassSchema);

// Export the Class model
module.exports = Class;
