import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { CiSearch } from 'react-icons/ci'
import { AiOutlineShopping, AiFillShopping } from 'react-icons/ai'
import { BsPerson } from 'react-icons/bs'
import Link from 'next/link'
import { signOut } from "next-auth/react"

type Props = {
    currentUser: {
        id: string;
        email: string;
        emailVerified: string;
        hashedPassword: string;
        image: string;
        name: string;
        updateAt: string;
    } | undefined,
    favorites: Array<Favorite>,
    toogleVisibleAuth: () => void,
    isLoading: boolean,
    cart: Array<Cart>
}

type Cart = {
    userId: number,
    productId: number,
    assignedAt: string
}

type Favorite = {
    userId: number,
    productId: number,
    assignedAt: string
}

const Header = ({ currentUser, toogleVisibleAuth, isLoading, favorites, cart }: Props) => {

    return (
        <header className='max-w-[1440px] m-auto flex flex-col sx:flex-row gap-4 sx:gap-0 items-center justify-between pt-4 pb-8 sx:pt-8'>
            <div>
                <Link href="/">
                    <img src="/images/logo-xl.png" alt="Logo" className='w-24 lg:w-48 cursor-pointer' />
                </Link>
            </div>
            <div className='flex items-center gap-4 md:gap-8'>
                <button>
                    {(favorites?.length == 0 || !favorites)
                        ?
                        <Link href='/favorites'>
                            <IoMdHeartEmpty className='text-gray-600' size={25} />
                        </Link>
                        :
                        <Link href='/favorites'>
                            <IoMdHeart color='#ff283e' size={25} />
                        </Link>
                    }
                </button>
                {(cart?.length == 0 || !cart)
                    ?
                    <Link href='/cart'>
                        <AiOutlineShopping className='text-gray-600  w-[25px] h-[25px]' size={25} />
                    </Link>
                    :
                    <Link href='/cart'>
                        <AiFillShopping color='rgb(255, 40, 62)' className='text-gray-600  w-[25px] h-[25px]' size={25} />
                    </Link>
                }

                <button>
                    <span className='flex items-center gap-2'>
                        <BsPerson className='text-gray-600 w-[25px] h-[25px]' size={25} />
                        <span className='text-gray-600'>
                            {currentUser?.email}
                        </span>

                        {
                            currentUser?.email ?
                                (<span onClick={() => signOut()} className='text-gray-600'>
                                    Log Out
                                </span>) : ''
                        }

                        {
                            !currentUser?.email && isLoading !== true ?
                                (<span onClick={toogleVisibleAuth} className='text-gray-600'>
                                    Sign in
                                </span>) : ''
                        }
                    </span>
                </button>
            </div>
        </header>
    )
}

export default Header