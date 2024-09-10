import Joi from "joi";

const addComment = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    userId: Joi.number().required(), 
    postId: Joi.number().required(), 
    parentId: Joi.number().optional(), 
  }),
};

const updateComment = {
  body: Joi.object().keys({
    content: Joi.string().optional(),
  }),
};


export const commentValidations = {
  addComment,
  updateComment
};
