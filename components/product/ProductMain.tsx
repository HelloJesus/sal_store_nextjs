import { AiOutlineSecurityScan, AiOutlineShopping } from "react-icons/ai"
import { BsTruck } from "react-icons/bs"
import { HiArrowsRightLeft } from "react-icons/hi2"

const ProductMain = () => {
    return (
        <>
            <div className="bg-gray-200 pt-6 pb-8 mb-14">
                <div className="grid gap-5 grid-cols-2 lg:grid-cols-4 lg:w-3/4 mx-2.5 lg:mx-auto text-center text-14
                lg:text-base">
                    <div className="flex flex-col items-center">
                        <div className="text-red-500 flex justify-center items-end h-12 mb-3">
                            <HiArrowsRightLeft
                                size={40}
                            />
                        </div>
                        <span>
                            Hassle Free returns
                            <br />
                            on all purchases
                        </span>
                    </div>
                    <div  className="flex flex-col items-center">
                        <div className="text-red-500 flex justify-center items-end h-12 mb-3">
                            <BsTruck
                                color="#ff283e"
                                size={40}
                            />
                        </div>
                        <span>
                            Flat rate shipping
                            <br />
                            via Australia Post
                        </span>
                    </div>
                    <div  className="flex flex-col items-center">
                        <div className="text-red-500 flex justify-center items-end h-12 mb-3">
                            <AiOutlineShopping
                                color="#ff283e"
                                size={40}
                            />
                        </div>
                        <span>
                            Hassle Free returns
                            <br />
                            on all purchases
                        </span>
                    </div>
                    <div  className="flex flex-col items-center">
                        <div className="text-red-500 flex justify-center items-end h-12 mb-3">
                            <AiOutlineSecurityScan
                                size={40}
                            />
                        </div>
                        <span>
                            All of proceeds go to
                            <br />
                            our shop
                        </span>
                    </div>
                </div>
            </div>

            <div className="mx-2.5 lg:mx-auto mb-24">

            </div>
        </>
    )
}

export default ProductMain