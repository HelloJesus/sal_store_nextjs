import fetcherParams from "@/lib/fetcherParams"
import { Dispatch, useEffect, useState } from "react"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"

interface Props {
    id?: number,
    userId: string,
    setVisibleAuth: Dispatch<boolean>,
    handleAddToFavorite: (method: string) => void,
    favorite?: boolean
}


const ProductFavoriteButton = ({ id, userId, setVisibleAuth, handleAddToFavorite, favorite }: Props) => {
    const [method, setMethod] = useState<string>("")
    if (id === undefined) return (
        <button className="flex justify-center items-center w-14 h-14 ml-3 border border-gray-800 rounded-full focus:outline-none active:bg-gray-800">

        </button>
    )

    useEffect(() => {
        favorite === false ? setMethod("DELETE") : setMethod("POST")
    }, [favorite])

    return (
        <>
            {
                (!favorite)
                    ?
                    <button
                        disabled={method === "POST"}
                        onClick={ () => {
                            if (!userId) {
                                setVisibleAuth(true)
                            } else {
                                setMethod("POST")
                                 handleAddToFavorite("POST")
                            }
                        }
                        }
                        className="flex justify-center items-center w-10 lg:w-14 h-10 lg:h-14 ml-3 border 
                    border-gray-800 rounded-full focus:outline-none active:bg-gray-800 group">
                        <IoMdHeartEmpty
                            className="group-active:fill-white h-[21px] w-[21px] lg:h-[27px] lg:w-[27px]"
                            size={27} />
                    </button >
                    :
                    <button
                        disabled={method === "DELETE"}
                        onClick={() => {
                            if (!userId) {
                                setVisibleAuth(true)
                            } else {
                                setMethod("DELETE")
                                handleAddToFavorite("DELETE")
                            }
                        }
                        }

                        className="flex justify-center items-center w-10 lg:w-14 h-10 lg:h-14 ml-3 border 
                    border-gray-800 rounded-full focus:outline-none active:bg-gray-800">
                        <IoMdHeart
                            className="group-active:fill-white h-[21px] w-[21px] lg:h-[27px] lg:w-[27px]"
                            color="#ff283e"
                            size={27} />
                    </button>
            }
        </>
    )
}

export default ProductFavoriteButton