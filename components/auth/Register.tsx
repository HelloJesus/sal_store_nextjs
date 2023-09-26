import { Formik, Form, Field, ErrorMessage } from "formik"
import { validateAuthForm } from "../../lib/validateAuthForm"
import { useCallback } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

const Register = () => {
    const router = useRouter()
    const { asPath } = router
    
    const register = async (email: string, password: string) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/signup`, {
                email, password
            })

            await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            window.location.replace(asPath)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validateAuthForm}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting }) => {
                    register(values.email, values.password)
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, errors }) => (
                    <Form className='mt-8'>
                        <div className='pb-8 relative'>
                            <div className={`m-auto max-w-xs w-full rounded-full border ${errors.email ? 'border-red-500' : 'border-sky-950'}  px-4 py-2.5`}>
                                <Field className='w-full bg-transparent outline-none' type="email" id='email' name='email' placeholder='Email' />
                            </div>
                            <ErrorMessage
                                component='div'
                                className='absolute mt-1 w-full text-center text-red-500 text-xs leading-none'
                                name='email'
                            />
                        </div>
                        <div className='pb-8 relative'>
                            <div className={`m-auto max-w-xs w-full rounded-full ${errors.password ? 'border-red-500' : 'border-sky-950'} border px-4 py-2.5`}>
                                <Field className='w-full bg-transparent outline-none' type="password" id='password' name='password' placeholder='Password' />
                            </div>
                            {/* <div className='absolute mt-1 w-full text-center text-red-500 text-xs leading-none'>
                            Error
                        </div> */}
                            <ErrorMessage
                                component='div'
                                className='absolute mt-1 w-full text-center text-red-500 text-xs leading-none'
                                name='password'
                            />
                        </div>
                        <div className='pb-8 relative'>
                            <div className={`m-auto max-w-xs w-full rounded-full ${errors.confirmPassword ? 'border-red-500' : 'border-sky-950'} border px-4 py-2.5`}>
                                <Field className='w-full bg-transparent outline-none' type="password" id='confirmPassword' name='confirmPassword' placeholder='Password' />
                            </div>
                            {/* <div className='absolute mt-1 w-full text-center text-red-500 text-xs leading-none'>
                            Error
                        </div> */}
                            <ErrorMessage
                                component='div'
                                className='absolute mt-1 w-full text-center text-red-500 text-xs leading-none'
                                name='confirmPassword'
                            />
                        </div>
                        <button disabled={isSubmitting}
                            type='submit' className='h-10  text-white bg-sky-950 rounded-full px-24'>
                            <span>
                                Sign Up
                            </span>
                        </button>
                    </Form>
                )}
            </Formik >
        </>
    )
}

export default Register