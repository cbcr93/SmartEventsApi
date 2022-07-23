import * as yup from 'yup'

export const ticketCreateValidator = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        title: yup.string().required('title is required'),
        description: yup.string().required('description is required'),
        category: yup
          .string()
          .required('category is required'),
        price: yup.number().required('price number is required'),
        amounts: yup.number().required('amounts is required'),
      }),
    },
  },
}