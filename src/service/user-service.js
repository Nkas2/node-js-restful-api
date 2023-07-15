import {prismaClient} from '../application/database.js';
import { RespondError } from '../error/respond-error.js';
import { getUserVlidation, loginUserValidation, registerUserValidation, updateUserValidate} from '../validation/user-validation.js'
import {validate} from '../validation/validation.js' 
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

const register = async (request) => {
   // validasi request menggunakan schme registerUserValidation
   const user = validate(registerUserValidation, request);

   // mencari apakah ada username yang sama dari database
   const countUser = await prismaClient.user.count({
      where : {
         username: user.username
      }
   });

   // jika username ada maka throw error
   if(countUser === 1) {
      // throw respond error dengan custom RespondError(status, message)
      throw new RespondError(400, "username already exists")
   }

   // hashing password cuser
   user.password = await bcrypt.hash(user.password, 10);

   // create user ke database, returnnya object username dan name
   return prismaClient.user.create({
      data: user,
      select: {
         username: true,
         name: true
      },
   })
}

const login = async (request) => {
   // data dari client
   const loginRequest = validate(loginUserValidation, request);

   // data dari data base
   const user = await prismaClient.user.findUnique({
      where: {
         username: loginRequest.username,
      },
      select: {
         username: true,
         password: true
      }
   })

   // kalo ga ada username yang sama maka dijalankan
   if(!user) {
      throw new RespondError(401, "username or password wrong");
   }

   // compare password dari client dengan password dari database yang sudah di bcrypt
   const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

   // kalo passwordnya sesuai dengan data base maka dijalankan
   if(!isPasswordValid) {
      throw new RespondError(401, "username or password wrong");
   }

   const token = uuid().toString();

   return prismaClient.user.update({
      data: {
         token : token
      },
      where: {
         username : user.username
      },
      select : {
         token: true
      }
   })
}

const get  = async (username) => {
   username = validate(getUserVlidation, username);

   const user = await prismaClient.user.findUnique({
      where: {
         username : username
      },
      select : {
         username : true,
         name : true
      }
   });

   if(!user) {
      throw new RespondError(404, 'user is not found');
   }

   return user;
}

const update = async (request) => {
   const user = validate(updateUserValidate, request)
   const totalUserInDatabase = await prismaClient.user.count({
      where: {
         username : user.username
      }
   })

   if (totalUserInDatabase !== 1) {
      throw new RespondError(404, 'user is not found')
   }

   const data = {}

   if(user.name) {
      data.name = user.name
   }

   if(user.password) {
      data.password = user.password
   }

   return prismaClient.user.update({
      where : {
         username : user.username
      },
      data : data,
      select : {
         username : true,
         name : true
      }
   })
   
}

export default {
   register,
   login,
   get,
   update
}