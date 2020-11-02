import joi from 'joi'

export const LoginValidator = (data: any) => {
  const schema = joi.object({
    email: joi
      .string()
      .required()
      .email({
        tlds: {
          allow: false,
        },
      }),
    password: joi.string().required().min(6),
  })
  return schema.validate(data)?.error?.details[0]?.message
}

export const RefreshValidator = (data: any) => {
  const schema = joi.object({
    email: joi
      .string()
      .required()
      .email({
        tlds: {
          allow: false,
        },
      }),
    refresh_token: joi.string().required(),
  })
  return schema.validate(data)?.error?.details[0]?.message
}

export const RegisterValidator = (data: any) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi
      .string()
      .required()
      .email({
        tlds: {
          allow: false,
        },
      }),
    password: joi.string().required().min(6),
  })
  return schema.validate(data)?.error?.details[0]?.message
}
