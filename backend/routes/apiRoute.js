const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const { createInvoice } = require("../generateInvoice");
const path = require("path");

router.get("/", (req, res) => {
  res.send("Api Working");
});

router.post("/add-product", (req, res) => {
  const { dsin, system_listing_name, mrp, hsn_code, gst_slab, unit } = req.body;

  if (
    !dsin ||
    !system_listing_name ||
    !mrp ||
    !hsn_code ||
    !gst_slab ||
    !unit
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // create new product in database

    const newProduct = Product.create({
      dsin,
      system_listing_name,
      mrp,
      hsn_code,
      gst_slab,
      unit,
    });

    if (newProduct) {
      return res.status(201).json({ message: "New Product added !" });
    } else {
      return res.status(400).json({ message: "Error adding new product" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/create-invoice", async (req, res, next) => {
  try {
    const products = await Product.find();
    await createInvoice(products, "invoice.pdf");
    // console.log(products);

    res.status(200).sendFile("invoice.pdf", { root: "." }, function (err) {
      if (err) {
        next(err);
      } else {
        console.log("file send!!");
      }
    });

    // res.status(200).json({ message: "Successfully downloaded invoice" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
