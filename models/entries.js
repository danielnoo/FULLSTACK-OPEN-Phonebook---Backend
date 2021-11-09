const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const entrySchema = new mongoose.Schema({
  name: { 
    type: String,
    unique: true,
    minLength: 2,
    required: true 
  },
  number: {
    type: String,
    unique: true,
    minLength: 2,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean,
});

entrySchema.plugin(uniqueValidator)

/// create method to convert object to JSON and change a few fields
entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Entry", entrySchema);
