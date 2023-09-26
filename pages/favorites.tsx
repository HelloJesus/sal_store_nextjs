import FormAuth from "@/components/auth/FormAuth"
import Header from "@/components/header/header"
import useCurrentUser from "@/hooks/useCurrentUser"
import useFavorites from "@/hooks/useFavorites"
import useCart from "@/hooks/useCart"
import fetcherParams from "@/lib/fetcherParams"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: { session }
  }
}

const Favorites = () => {
  const [visibleAuth, setVisibleAuth] = useState(false)
  const { data: user, isLoading, error } = useCurrentUser()

  const toogleVisibleAuth = useCallback(() => {
    setVisibleAuth(!visibleAuth)
  }, [])


  const { data: favorites, isLoading: loadingFavorites, mutate } = useFavorites(user)
  const { data: cart } = useCart(user)

  const update = (productId: string) => fetcherParams({
    method: "DELETE",
    url: productId && `${process.env.NEXT_PUBLIC_API_HOST}/favorite/` + productId,
    headers: { "Content-type": "application/json" },
  })

  const updateFavorite = async (productId: string) => {
    await mutate(update(productId),
      {
        populateCache: (update: any, res: any) => {
          const filteredTodos = res.filter((elem: any) => elem.productId !== productId)
          return [...filteredTodos]
        },
        revalidate: true
      })
  }

  return (
    <>
      <Head>
        <title>Salvo Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <FormAuth closeModal={setVisibleAuth} visible={visibleAuth} user={user} />
      <Header
        currentUser={user}
        toogleVisibleAuth={toogleVisibleAuth}
        isLoading={false}
        favorites={favorites}
        cart={cart}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {Array.isArray(favorites) && favorites?.map((elem, index): any => {
          return (
            <div key={index} className="py-3 px-2.5 bg-slate-200 rounded-lg flex gap-2.5 justify-between items-center flex-col sx:flex-row">
              <div className="flex gap-2.5 flex-col items-center sx:flex-row sx:items-start">
                <Link href={`/product/${elem.products?.id}`}>
                  <div className="max-w-[150px] relative">
                    <Image
                      src={elem.products.image_l}
                      alt={elem.products.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto"
                    />
                  </div>
                </Link>
                <div className="py-2">
                  <p>
                    {elem.products.title}
                  </p>
                  <p>
                    <span className="font-bold">Brands:</span> {elem.products.brands}
                  </p>
                </div>
              </div>
              <button className="rounded-full bg-red-500 text-white max-w-[120px] w-full px-2.5 py-1 active:bg-red-700"
                onClick={() => updateFavorite(elem.productId)}>
                delete
              </button>
            </div>
          )
        })}


      </div>
    </>
  )
}

export default Favorites