const userRouter=require('express').Router();

const getUsers=require('../controllers/users_controllers')

userRouter.get('/',getUsers)

module.exports=userRouter;