import Joi from "joi";

const addPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    userId: Joi.number().required(),
  }),
};

const updatePost = {
  body: Joi.object().keys({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
  }),
};

export const postValidations = {
  addPost,
  updatePost
};
