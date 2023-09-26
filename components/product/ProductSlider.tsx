import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useRef, useState } from 'react';
import "swiper/css";
import 'swiper/css/free-mode';


type Props = {
    productId: number,
    title: string,
    images: Array<Images>
}

interface Images {
    id: number,
    image: string,
    productId: number
}

const ProductSlider = ({ productId, title, images }: Props) => {
    const [swiper, setSwiper] = useState<any>();

    const sliderScrollHandler = (slideIndex: number) => {
        swiper.slideTo(slideIndex)
    }

    return (
        <div className="grid  content-start gap-x-4 gap-y-8 lg:col-span-2">
            <div className="hidden lg:block w-auto">
                {images.map((elem: Images, index: number) => {
                    return (
                        <div onClick={() => sliderScrollHandler(index)} className="grid items-center bg-gray-200 cursor-pointer w-20 h-20 relative mb-2" key={index}>
                            {productId &&
                                <Image fill={true} src={elem.image.toString()} alt={title} />
                            }
                        </div>
                    )
                })}
            </div>
            <div className='z-0 flex justify-center items-center cursor-pointer overflow-hidden rounded pb-[100%] w-full relative '>
                <Swiper className='!absolute left-0 top-0 w-full h-full'
                    spaceBetween={0}
                    slidesPerView={1}
                    onSwiper={(swiper) => setSwiper(swiper)}
                    modules={[FreeMode]}
                >
                    {images.map((elem: Images, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className='relative h-full'>
                                    {productId &&
                                        <img src={elem.image} className='absolute top-0 left-0 w-full h-full object-cover object-center' alt={title} />
                                    }
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            <div className='text-xs leading-22 col-start-2 col-end-2 hidden lg:block'>The images form part of the description and should be considered to determine the quality of the item. We take as much care as possible to ensure that all details, descriptions and prices of products are listed correctly. If you think we’ve made an error, please get in touch to let us know.
            </div>
        </div>
    )
}

export default ProductSlider
