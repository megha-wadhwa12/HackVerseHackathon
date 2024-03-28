const express = require("express");
const userRoutes = express.Router()
const { getAllUsers, getOneUser, AddNewUser, updateAllUsers, deleteOneUser, LoginUser
} = require('../Controllers/UserControllers')

userRoutes.get('/',getAllUsers)

userRoutes.post('/signup', AddNewUser)

userRoutes.post('/login',LoginUser)

userRoutes.get('/:id',getOneUser)

userRoutes.put('/:id', updateAllUsers)

userRoutes.delete('/:id', deleteOneUser)


module.exports = userRoutes