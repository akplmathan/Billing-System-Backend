const bcrypt = require('bcryptjs');
const validator = require('Validator')
const User = require('../model/UserModel')
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../verify/verify');
require("dotenv").config();

//register User
router.post("/signup",async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const validEmail = await validator.isEmail(email);
      const UserExist = await User.findOne({ email: email });
  
      if (!name || !email || !password) {
        return res.send({ msg: "Fill The all Required Fields" });
      } else {
        if (!validEmail) {
          return res.send({ msg: "Please Enter Valid Email" });
        }
        if (!UserExist) {
          if (password.length < 8) {
            return res.send({ msg: "Password must be have 8 letters" });
          }
  
          const salt = Number(process.env.SALT);
  
          const HashedPassword = await bcrypt.hashSync(password, salt);
  
          const user = {
            name,
            email,
            password: HashedPassword,
                      };
         
          await User.create(user);
  
          res.send({ msg: "user Created Successfully" });
        } else {
          res.send({ msg: "user already exists" });
        }
      }
    } catch (error) {
      console.log(error);
    }})


    router.post("/login", async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
      
          if (user) {
            const PSCheck = bcrypt.compareSync(password, user.password);
            if (PSCheck) {
              const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT);
              res.send({ token });
            } else {
              return res.send({ msg: "incorrect password" });
            }
          } else {
            return res.send({ msg: "User Doesn`t exist" });
          }
        } catch (error) {
          console.log(error);
        }
      });


      
//find SingleUser
router.get("/find-user", verifyToken, async (req, res) => {
    try {
      const id = req.id;
      const response = await User.findById(id);
      res.send(response);
    } catch (error) {
      console.log(error);
    }
  });


  module.exports = router