import Joi from "joi";

// schema untuk user
const registerUserValidation = Joi.object({
   username: Joi.string().max(100).required(),
   password: Joi.string().max(100).required(),
   name: Joi.string().max(100).required()
})

const loginUserValidation = Joi.object({
   username: Joi.string().max(100).required(),
   password: Joi.string().max(100).required()
})

const getUserVlidation = Joi.string().max(100).required();

const updateUserValidate = Joi.object({
   username : Joi.string().max(100).required(),
   password : Joi.string().max(100).optional(),
   name : Joi.string().max(100).optional()

})

export {
   registerUserValidation,
   loginUserValidation,
   getUserVlidation,
   updateUserValidate
}