import Joi from "joi";

const addUser = {
    body: Joi.object().keys({
        first_name: Joi.string().required(), 
        last_name: Joi.string().required(), 
        email: Joi.string().optional().email(),
        password: Joi.string().optional()
   })
}

const updateUser = {
   body: Joi.object().keys({
     first_name: Joi.string().required(),
     last_name: Joi.string().required(),
     email: Joi.string().optional().email(),
     password: Joi.string().optional()
   })
 }

export const userValidations = {
   addUser, 
   updateUser
};