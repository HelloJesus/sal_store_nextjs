import { AiOutlineShopping } from "react-icons/ai"
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { BsTruck } from "react-icons/bs"
import { TbHandClick } from "react-icons/tb"
import { useSWRConfig } from "swr"
import fetcherParams from "@/lib/fetcherParams"
import useFavorites from "@/hooks/useFavorites"
import ProductFavoriteButton from "./ProductFavoriteButton"
import { Dispatch } from "react"

interface Props {
    data?: {
        id: number,
        title: string,
        description: string,
        size: string,
        material: string,
        brands: string,
        codeProduct: string,
        image_l: string,
        image_xl: string,
        images: Array<Images>,
        gender: string,
        price: number,
        count: number,
        subcategoryId: number
    },
    userId: string,
    favorite?: boolean,
    setVisibleAuth: Dispatch<boolean>,
    cartStatus: boolean,
    handleAddToFavorite: (method: string) => void,
    handleAddToCart: (method: string) => void
}

interface Images {
    id: number,
    image: string,
    productId: number
}

const ProductInfo = ({ data, userId, favorite, setVisibleAuth, cartStatus, handleAddToFavorite, handleAddToCart }: Props) => {

    return (
        <div>
            <h1 className="mb-2 text-xl lg-text-2xl font-semibold">
                {data?.title}
            </h1>
            <div className="mb-4">
                <p className="text-xs text-gray-400">
                    SKU: {data?.codeProduct}
                </p>
            </div>
            <div className="mb-4 lg:mb-8">
                <p className="font-medium lg:font-semibold text-2xl lg:text-3xl">
                    ${data?.price}.00
                </p>
            </div>
            <div className="mb-6">
                <div className="flex items-center">
                    {
                        // (!cartStatus || cartStatus.length === 0)
                        (!cartStatus)
                            ?
                            <button onClick={() => {
                                if (!userId) {
                                    setVisibleAuth(true)
                                } else {
                                    handleAddToCart("POST")
                                }
                            }
                            } className="flex-auto flex justify-center items-center max-w-[250px] h-10 lg:h-14 rounded-full focus:outline-none bg-gray-800">
                                <span className="text-white uppercase text-base lg:text-lg font-semibold ml-3 mr-3">
                                    add to bag
                                </span>
                                <AiOutlineShopping
                                    className="h-[25px] w-[25px] lg:h-[35px] lg:w-[35px]"
                                    color="#ff283e"
                                    size={35}
                                />
                            </button>
                            :
                            <button onClick={() => {
                                if (!userId) {
                                    setVisibleAuth(true)
                                } else {
                                    handleAddToCart("DELETE")
                                }
                            }} className="flex-auto flex justify-center items-center max-w-[250px] h-10 lg:h-14 rounded-full focus:outline-none bg-gray-800">
                                <span className="text-white uppercase text-base lg:text-lg font-semibold ml-3 mr-3">
                                    delete from bag
                                </span>
                                <AiOutlineShopping
                                    className="h-[25px] w-[25px] lg:h-[35px] lg:w-[35px]"
                                    color="#ff283e"
                                    size={35}
                                />
                            </button>
                    }
                    < ProductFavoriteButton
                        id={data?.id}
                        userId={userId}
                        setVisibleAuth={setVisibleAuth}
                        favorite={favorite}
                        handleAddToFavorite={handleAddToFavorite}
                    />

                </div>
            </div>
            <div>
                <p className="leading-7 font-semibold mt-4 lg:mt-7 mb-2">
                    Delivery Options
                </p>
                <div className="flex flex-wrap my-4 lg:my-6">
                    <div className="flex items-center w-1/2 md-3 lg:mb-6">
                        <BsTruck className="mr-4 h-[30px] w-[30px] lg:h-[40px] lg:w-[40px]"
                            color="#ff283e"
                            size={40}
                        />
                        <div className="text-xs">
                            <p className="font-medium">
                                AusPost Parcel
                            </p>
                            <p>
                                From $7.00
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center w-1/2 md-3 lg:mb-6">
                        <TbHandClick className="mr-4 h-[29px] w-[29px] lg:h-[38px] lg:w-[38px]"
                            color="#ff283e"
                            size={38}
                        />
                        <div className="text-xs">
                            <p className="font-medium">
                                Click & Collect
                            </p>
                            <p>
                                Pick up in store
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-300 mt-5" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-8 lg:mb-0 lg:w-3/4 mt-5">
                <div>
                    <p className="font-medium uppercase">
                        Condition
                    </p>
                    <p className="text-xs">
                        Used: very good
                    </p>
                </div>
                <div>
                    <p className="font-medium uppercase">
                        Brands
                    </p>
                    <p className="text-xs">
                        {data?.brands}
                    </p>
                </div>
                <div>
                    <p className="font-medium uppercase">
                        Size
                    </p>
                    <p className="text-xs">
                        {data?.size}
                    </p>
                </div>
                <div>
                    <p className="font-medium uppercase">
                        Material
                    </p>
                    <p className="text-xs">
                        {data?.material}
                    </p>
                </div>
            </div>
        </div >
    )
}

export default ProductInfo