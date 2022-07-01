// url sorting ,Some url have a effect to web

let express = require("express");
let router = express.Router();
let productModel = require("../models/product");
let multer = require("multer");
// let path = require('path');

let storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./public/images/products");
  },
  // change image name
  filename: function (req, file, cd) {
    cd(null, `${Date.now()}.jpg`);
  },
});

let uploadImage = multer({
  storage: storage,
});

router.get("/", function (req, res) {
  const name = "fluke";
  const age = 10;
  const address = "<h3>มหาวิทยาลัยพะเยา</h3>";

  res.render("index", { name: name, age: age, address: address });
});

router.get("/list", function (req, res) {
  // let productList = [
  //   { name: "laptop", price: 499, image: "images/products/product1.png" },
  //   { name: "เสื้อ", price: 350, image: "images/products/product2.png" },
  //   { name: "หูฟัง", price: 59, image: "images/products/product3.png" },
  //   { name: "laptop", price: 499, image: "images/products/product1.png" },
  //   { name: "เสื้อ", price: 350, image: "images/products/product2.png" },
  //   { name: "หูฟัง", price: 59, image: "images/products/product3.png" },
  //   { name: "laptop", price: 499, image: "images/products/product1.png" },
  //   { name: "เสื้อ", price: 350, image: "images/products/product2.png" },
  //   { name: "หูฟัง", price: 59, image: "images/products/product3.png" },
  // ];

  productModel.find().exec((err, doc) => {
    res.render("listData", { product: doc });
  });
});

router.get("/form", function (req, res) {
  res.render("form");
});



router.get("/manage", function (req, res) {
  productModel.find().exec((err,doc)=>{
    res.render("manage", { product:doc });
  })
});

router.post("/insert", uploadImage.single("image"), function (req, res) {
  // console.log(req.body);
  //  console.log(req.file);
  let data = new productModel({
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
    description: req.body.description,
  });
  // console.log(data);
  //  res.render('form');

  productModel.createProduct(data, (err) => {
    if (err) console.log(err);
    res.redirect("/list");
  });
});

router.get("/deleteProduct/:id", function (req, res) {
  const id = req.params.id;

  productModel
    .findByIdAndDelete(id, {
      useFindAndModify: true,
    })
    .exec((err) => {
      if (err) console.log(err);
      res.redirect("/manage");
    });
});

router.post("/editProduct", function (req, res) {
   const edit_id = req.body.edit_id;
   productModel.findOne({ _id: edit_id }).exec(function (err, doc) {
    res.render("edit", { product:doc });
  });
});

router.post("/updateProduct", function (req, res) {
  const proId = req.body.edit_id;
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  // console.log(proId)
  // console.log(data)

  productModel.findByIdAndUpdate(proId,data, {
    useFindAndModify: false,
  }) .exec((err) => {
    if (err) console.log(err);
    res.redirect("/manage");
  });
});

router.get("/:id", function (req, res) {
  const proId = req.params.id;
  productModel.findOne({ _id: proId }).exec(function (err, doc) {
    res.render("product", { product:doc });
  });
});

module.exports = router;
