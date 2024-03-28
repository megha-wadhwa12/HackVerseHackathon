const { mongoose } = require("mongoose");
const mongooseUserModel = require("../Models/UserSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserValidationSchema } = require("../Validation");


const getAllUsers = async (req, res) => {
  try {
    const AllUsers = await mongooseUserModel.find({});
    res.status(200).json({ AllUsers });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching All Users" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const OneUser = await UserDataModel.find({
      Username: req.params.id,
    }).exec();
    if (OneUser.length === 0) {
      res.status(404).json({ message: "User not Found", OneUser });
    } else {
      res.status(200).json({ OneUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Data" });
  }
};

const AddNewUser = async (req, res) => {
  try {
    const rank = await mongooseUserModel.countDocuments({}).exec()
    const { error, value } = UserValidationSchema.validate({...req.body,Rank: rank+1,Topics: []}, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      const allErrors = error.details.map((e) => e.message);
      res.status(400).json({ error: allErrors });
    } else {
      const { Name, UserName, EmailId , Password, Rank,Topics } = value;

      const hashedPassword = await bcrypt.hash(Password, 10);

      const existingUser = await mongooseUserModel.findOne({ UserName });
      if (existingUser) {
        return res
          .status(400)
          .send("User Already Exists, Please Login to Continue.");
      }

      const postUser = await mongooseUserModel.create({
        Name,
        UserName,
        EmailId ,
        Password: hashedPassword,
        Topics,
        Rank,
      });
      const authData = {
        UserName: postUser.UserName,
      };
      if (postUser) {
        const access_token = jwt.sign(
          authData.UserName,
          process.env.JWT_SECRET_KEY
        );
        console.log("access_token1: ", access_token);
        res.status(201).json({
          access_token: access_token,
          postUser: postUser,
        });
      } else {
        return res.status(400).send("Failed to create new user.");
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send(`Internal Server Error. ${err}`);
  }
};

const LoginUser = async (req, res) => {
  console.log(req.body);
    try {
      const {UserName,Password,Name} = req.body
      const user = await mongooseUserModel.findOne({ UserName })

      console.log('user', user)
      if(!user){
        return res.status(400).json({error: "Invalid Username"})
      }
  
      const isPasswordValid = await bcrypt.compare(Password,user.Password)
      if(!isPasswordValid){
        return res.status(401).json({ error: "Invalid Password" })
      }
      res.status(200).json({
        user: {
          UserName: user.UserName,
          Password: user.Password,
          Name: user.Name
        },
      });
  
    } catch (error) {
      console.log('Error Logging In: ', error)
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

const updateAllUsers = async (req, res) => {
  try {
    const updateUsers = await mongooseUserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Update all Users", updateUsers });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Updating All Users" });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const deleteUser = await mongooseUserModel.findByIdAndDelete(req.params.id);
    console.log(deleteUser);
    if (deleteUser) {
      res
        .status(200)
        .json({ message: `Delete User for ${req.params.id}`, deleteUser });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error Deleting User" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  AddNewUser,
  updateAllUsers,
  deleteOneUser,
  LoginUser,
};
