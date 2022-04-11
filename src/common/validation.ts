import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[A-Za-z]+$/,'Is not in correct format')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .matches(/^[A-Za-z]+$/,'Is not in correct format')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    postcode: Yup.string()
        .length(5,'Only 5 characters!')
        .required('Required'),
    address: Yup.string()
        .min(5, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),
    phone: Yup.string()
        .min(19, 'Too Short!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    city: Yup.object().nullable().required('Required'),
});