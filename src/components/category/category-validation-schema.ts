import * as yup from 'yup';

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  // type: yup.object().nullable().required('form:error-type-required'),
  type: yup.object().nullable(),
  order:yup.number().max(6).notRequired().nullable()
});
