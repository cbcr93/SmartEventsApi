import * as yup from 'yup'

export const userCreateValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required('name is required'),
        email: yup.string().required('email is required'),
        password: yup
          .string()
          .required('password is required'),
        username: yup.string().required('username number is required'),
        isSeller: yup.bool().required('email is required'),
      }),
    },
  },
}

export const loginValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        login: yup.string().required('username/email is required'),
        password: yup
          .string()
          .required('password is required'),
      }),
    },
  },
}
