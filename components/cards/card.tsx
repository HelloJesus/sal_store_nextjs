import Link from "next/link"
import Image from 'next/image'
import { CiShop } from "react-icons/ci"
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { Dispatch } from "react"

type Props = {
    productId: number,
    title: string,
    price: number,
    image_l: string,
    userId: string,
    favorites: favorite[],
    updateFavorite: (method: string, productId: string) => Promise<void>,
    setVisibleAuth: Dispatch<boolean>,
    isLoading: boolean  
}

type favorite = {
    userId: string,
    productId: number,
    assignedAt: string
}

const Card = ({ productId, title, price, image_l, userId, favorites, updateFavorite, setVisibleAuth, isLoading }: Props) => {
    if (isLoading === true && !productId) return (<div>загрузка</div>)
    
    const favorite = Array.isArray(favorites) && favorites.some((elem:favorite) => elem.productId === productId)

    return (
        <div className="flex flex-col rounded shadow-lg bg-white hover:shadow-none duration-300">
            <Link href={`/product/${productId}`} className="relative">
                <div className="relative pb-full pb-[80%]">
                    <Image
                        src={image_l.toString()}
                        alt={title}
                        fill={true}
                        sizes="(max-width: 768px) 100vw"
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </Link>
            <div className="pt-2 px-2 pb-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between">
                    <p>USA</p>
                    <CiShop
                        size="1.6rem"
                    />
                </div>
                <Link href={`/product/${productId}`} className="mt-2 text-xs lg:text-base">
                    {title}
                </Link>
                <div className="flex items-center justify-between mt-8">
                    <Link href={`/product/${productId}`}>
                        <p className="font-medium lg:font-semibold text-xs lg:text-xl ">
                            ${price}.00
                        </p>
                    </Link>
                    {
                        ((!favorite) || userId === undefined)
                            ?
                            <button onClick={() => {
                                if (!userId) {
                                    setVisibleAuth(true)
                                } else {
                                    updateFavorite("POST", productId.toString())
                                }
                            }}>
                                <IoMdHeartEmpty
                                    color="#ff283e"
                                    size="1.6rem"
                                />
                            </button>
                            :
                            <button onClick={() =>{
                                if (!userId) {
                                    setVisibleAuth(true)
                                } else {
                                    updateFavorite("DELETE", productId.toString())
                                }
                            }}>
                                <IoMdHeart
                                    color="#ff283e"
                                    size="1.6rem"
                                />
                            </button>
                    }

                </div>
            </div>

        </div>
    )
}

export default Card