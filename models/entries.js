const mongoose = require("mongoose");

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
  name: String,
  number: String,
  date: Date,
  important: Boolean,
});


entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Entry", entrySchema);
