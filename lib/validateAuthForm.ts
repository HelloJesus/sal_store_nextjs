import * as Yup from 'yup'

export const validateAuthForm = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required').min(3, 'Too Short'),
    confirmPassword: Yup.string().required('Passwords must match').oneOf([Yup.ref('password')], 'Passwords must match')
})