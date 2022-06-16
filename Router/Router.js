const express = require("express");
const routes = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/files" });

const controllersignup = require("../Controllers/User");
// Login endpoint
routes.post("/userlogin", controllersignup.userLogin);
//signup endpoint
routes.post("/usersignup", controllersignup.userSignup);
// upload file
routes.post(
  "/api/uploadFile",
  upload.single("products"),
  controllersignup.uploadfile
);
// getuserlist
routes.get("/getuserlist", controllersignup.getuserList);
//getproductslist
routes.get("/getproducts", controllersignup.getproductList);
module.exports = routes;
