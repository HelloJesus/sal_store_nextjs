import { Dispatch, useCallback, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import Login from './Login'
import Register from './Register'

interface FormAuthProps {
    closeModal: Dispatch<boolean>,
    visible: boolean,
    user: {
        name: string
        image: string
        email: string
    } | undefined
}

const FormAuth = ({ closeModal, visible, user }: FormAuthProps) => {
    let [authModal, setAuthModal] = useState('login')


    const toggleVariant = useCallback(() => {
        setAuthModal((authModal) => authModal === 'login' ? 'register' : 'login')
    }, [])

    const handleClose = useCallback(() => {
        closeModal(false)
    }, [])

    if (user) {
        return null
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full z-10' style={visible ? { display: 'block' } : { display: 'none' }}>
            <div className='w-full h-full flex items-center justify-center z-10 bg-white bg-opacity-75'>
                <div className='max-w-md w-full bg-white p-2 rounded-lg text-center drop-shadow-md'>
                    <div className='flex w-full justify-end'>
                        <button className='w-6 h-6' onClick={handleClose}>
                            <CgClose className='text-red-600' size={25} />
                        </button>
                    </div>
                    <h2 className='uppercase font-bold text-3xl text-sky-950'>
                        {authModal === 'register' ? 'sign up' : 'login'}
                    </h2>

                    {
                        authModal === 'login'
                            ? <Login />
                            : <Register />
                    }

                    {
                        authModal === 'login'
                            ?
                            <div className="mt-4 mb-4 text-center text-red-600 text-sm">Don't have an account?
                                <button onClick={toggleVariant} className="underline" type="button">Sign up here</button>
                            </div>
                            :
                            <div className="mt-4 mb-4 text-center text-gray-500 text-sm">
                                <button onClick={toggleVariant} type="button">Sign in if you already have an account</button>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default FormAuth