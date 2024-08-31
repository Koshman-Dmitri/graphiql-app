import * as yup from 'yup';

export interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationValidationSchema = yup.object<IFormData>().shape({
  name: yup
    .string()
    .required('Name is required')
    .test(
      'is-capitalized',
      'Name must start with a capital letter',
      (value) => !!value && value.charAt(0) === value.charAt(0).toUpperCase()
    ),
  email: yup
    .string()
    .required('Fill this field')
    .email('Must be a valid email')
    .matches(/^[\w-]+@([\w-]+.)+[a-z]{2,4}$/, 'Must be a valid email'),
  password: yup
    .string()
    .required('Fill this field')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[a-z]/, 'At least one lowercased letter')
    .matches(/[A-Z]/, 'At least one uppercased letter')
    .matches(/[!?@#$%^&*]/, 'At least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const LoginValidationSchema = yup.object<IFormData>().shape({
  email: yup
    .string()
    .required('Fill this field')
    .email('Must be a valid email')
    .matches(/^[\w-]+@([\w-]+.)+[a-z]{2,4}$/, 'Must be a valid email'),
  password: yup
    .string()
    .required('Fill this field')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[a-z]/, 'At least one lowercased letter')
    .matches(/[A-Z]/, 'At least one uppercased letter')
    .matches(/[!?@#$%^&*]/, 'At least one special character'),
});
