const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Userlogin = require("../Modules/Userlogin");
const Products = require("../Modules/Products");
exports.userSignup = async (req, res) => {
  try {
    const useremail = await Userlogin.findOne({ username: req.body.username });
    if (useremail == null && !useremail) {
      const userObj = new Userlogin({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
      });
      userObj
        .save()
        .then((response) => {
          res.json({ user: response, messeage: "user signup succcessful" });
        })
        .catch((response) => {
          res.json({ user: response, messeage: " user signup error" });
        });
    } else {
      res.json({ messeage: "user alredy exits" });
    }
  } catch {
    res.json({ messeage: "somthing went wrong" });
  }
};
exports.userLogin = async (req, res) => {
  const login = await Userlogin.findOne({ username: req.body.username });
  if (login === null || 0) {
    res.json({ messeage: "user not exits" });
  } else if (login !== null) {
    if (req.body.password) {
      const userdata = await bcrypt.compare(req.body.password, login.password);
      if (userdata) {
        const token = jwt.sign(
          { username: login.username, id: login._id },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          auth: userdata,
          token: token,
          messeage: "Login successfully",
        });
      } else if (!userdata || userdata === false) {
        res.json({ messeage: " invalid detail" });
      }
    } else {
      res.json({ messeage: "plz provide password" });
    }
  }
};

exports.uploadfile = (req, res) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const results = [];
  if (req.file) {
    // checking  request file undefinde or not
    if (req.file.mimetype == "text/csv") {
      // checking file extention
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          if (results.length > 0) {
            const checkname = results.map((i) => {
              return i.name;
            });

            Products.find({ name: checkname }).then((respones) => {
              // find product already exits or not
              if (respones.length > 0) {
                for (i = 0; i < respones.length; i++) {
                  for (j = 0; j < results.length; j++) {
                    if (results[j].name == respones[i].name) {
                      // removing the dublicate products
                      results.splice(j, 1);
                    }
                  }
                }
              }
              if (results.length > 0) {
                // inserting products into database
                Products.insertMany(results)
                  .then((response) => {
                    res.json({ messeage: "File upload successfully" });
                  })
                  .catch((error) => {
                    res.json({ messeage: "somthing went wrong" });
                  });
              } else {
                res.json({ messeage: "products already exits" });
              }
            });
          }
        });
    } else {
      res.json({ messeage: "only csv file allowed" });
    }
  }
};
exports.getuserList = (req, res) => {
  Userlogin.find().then((response) => {
    res.json({ data: response });
  });
};
exports.getproductList = (req, res) => {
  Products.find().then((respones) => {
    res.json({ data: respones });
  });
};
