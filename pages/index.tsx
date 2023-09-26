import Head from 'next/head'
import FormAuth from '@/components/auth/FormAuth'
import { signOut, useSession } from "next-auth/react"
import { useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useCurrentUser from '@/hooks/useCurrentUser'
import Header from '@/components/header/header'
import useFavorites from '@/hooks/useFavorites'
import useCart from '@/hooks/useCart'
import { BsArrowRight } from 'react-icons/bs'

type categoryItem = {
  img: string,
  title: string,
  alt: string,
  link: string
}

const Home = () => {
  const [visibleAuth, setVisibleAuth] = useState(false)
  const { data: currentUser, isLoading } = useCurrentUser()
  const { data: favorites } = useFavorites(currentUser)
  const { data: cart } = useCart(currentUser)

  const toogleVisibleAuth = useCallback(() => {
    setVisibleAuth(!visibleAuth)
  }, [])

  const categoriesInfo = [
    { img: '/images/man-category.png', title: 'men', alt: 'menCategory', link: '/products/men' },
    { img: '/images/women-category.png', title: 'women', alt: 'womenCategory', link: '/products/women' },
    { img: '/images/kids-category.png', title: 'kids', alt: 'kidsCategory', link: '/products/kids' }
  ]

  return (
    <>
      <Head>
        <title>Salvo Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>

      <FormAuth closeModal={setVisibleAuth} visible={visibleAuth} user={currentUser} />
      <Header
        currentUser={currentUser}
        favorites={favorites}
        toogleVisibleAuth={toogleVisibleAuth}
        isLoading={isLoading}
        cart={cart}
      />
      <main className='max-w-[1440px] m-auto'>
        <div className='w-full sx:pt-10 pb-8 px-0 lg:px-16 xl:px-32'>
          <div className='flex flex-col sx:flex-row items-start gap-x-4 lg:gap-x-8 w-full'>
            {
              categoriesInfo.map((item: categoryItem, i) => {
                return (
                  <Link className='relative w-[100%] md:w-[33%] pb-4 cursor-pointer' href={item.link} key={i}>
                    <div className='relative pb-[150%]  drop-shadow-2xl overflow-hidden rounded-xl'>
                      <Image fill={true} src={item.img} className='object-contain transition duration-300 hover:scale-110' alt={item.alt} />
                    </div>
                    <p className='ml-1 lg:ml-5 mt-2 lg:mt-0 leading-none text-xl lg:text-2xl xl:text-4xl font-bold uppercase text-gray-700'>{item.title}</p>
                    <div className='mr-1 lg:mr-5 mb-4 absolute right-0 bottom-0 flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-white rounded-full pointer-events-none'>
                      <BsArrowRight 
                      className='h-[25px] w-[25px]  xl:h-[30px] xl:w-[30px]'
                        size={30}
                      />
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Home