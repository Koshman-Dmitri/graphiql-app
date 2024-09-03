import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .required('Fill this field')
    .email('Must be a valid email')
    .matches(/^[\w-]+@([\w-]+\.)+[a-z]{2,4}$/, 'Must be a valid email'),
  password: yup
    .string()
    .required('Fill this field')
    .matches(/[0-9]/, 'At least one digit')
    .matches(/[a-zA-Z]/, 'At least one letter')
    .matches(/[!?@#$%^&*]/, 'At least one special character')
    .min(8, 'Minimum 8 symbols'),
});

export default schema;
