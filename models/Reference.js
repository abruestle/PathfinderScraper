var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ReferenceSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  startlink: {
    type: String,
    required: true
  },
  //How many references and what the last part goes to...done this way instead of an integer so that further integration can be done with non-classes
  outputTypes: {
    type: String,
    required: true
  },
  // html to search for each reference
  references: {
    type: String,
    required: true
  },
  //Exceptions are carried over.
  exceptions: {
    type: String,
    required: true
  },
  //derivation 0 = base reference; derivation 1 = what it references...
  //used to make sure there is no repeats while making all references down to the last.
  derivation: {
    type: Number,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Reference = mongoose.model("Reference", ReferenceSchema);

// Export the Reference model
module.exports = Reference;
