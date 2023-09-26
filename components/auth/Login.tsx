import { Formik, Form, Field } from "formik"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"

const Login = () => {
    const [errLogin, setErrLogin] = useState<any>()

    const router = useRouter()
    const { asPath } = router
    const login = async (email: string, password: string) => {
        // try {
        await signIn('credentials', {
            email,
            password,
            // callbackUrl: '/',
            redirect: false,
        }).then(({ ok, error }: any) => {
            if (ok) window.location.replace(asPath)
            setErrLogin(error)
        })
    }
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    login(values.email, values.password)
                }}
            >
                <Form className='mt-8'>
                    <div className='pb-8 relative'>
                        <div className={`m-auto max-w-xs w-full rounded-full border 
                            ${errLogin === 'Email does not exist' ? 'border-red-500' : 'border-sky-950'} 
                        px-4 py-2.5`}>
                            <Field className='w-full bg-transparent outline-none' type="email" id='email' name='email' placeholder='Email' />
                        </div>
                        {errLogin === 'Email does not exist'
                            ?
                            <div className='absolute mt-1 w-full text-center text-red-500 text-xs leading-none'>
                                Email does not exist
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className='pb-8 relative'>
                        <div className={`m-auto max-w-xs w-full rounded-full 
                        ${errLogin === 'Incorrect password' ? 'border-red-500' : 'border-sky-950'} 
                         border px-4 py-2.5`}>
                            <Field className='w-full bg-transparent outline-none' type="password" id='password' name='password' placeholder='Password' />
                        </div>
                        {errLogin === 'Incorrect password'
                            ?
                            <div className='absolute mt-1 w-full text-center text-red-500 text-xs leading-none'>
                                Incorrect password
                            </div>
                            :
                            null
                        }
                    </div>
                    <div>{errLogin}</div>
                    <button type="submit" className='h-10  text-white bg-sky-950 rounded-full px-24'>
                        Login
                    </button>
                </Form>
            </Formik>
        </>
    )
}

export default Login