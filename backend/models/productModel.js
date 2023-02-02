const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
  {
    dsin: {
      type: String,
      require: [true, "Please add a dsin no. !"],
      unique: true,
    },
    system_listing_name: {
      type: String,
      require: [true, "Please add an system_listing_name !"],  
    },
    mrp: {
      type: Number,
      require: [true, "Please add a mrp !"],
    },
    hsn_code: {
      type: Number,
      require: [true, "Please add a hsn_code !"],
    },
    gst_slab: {
      type: Number,
      require: [true, "Please add a gst_slab !"],
    },
    unit: {
      type: String,
      require: [true, "Please add a unit !"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
