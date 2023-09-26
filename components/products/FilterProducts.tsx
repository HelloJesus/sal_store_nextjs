import Link from "next/link"
import { useRouter } from "next/router"
import { Dispatch } from "react"

type Props = {
    category?: string,
    setPageIndex: Dispatch<number>,
}

const FilterProducts = ({ category = '', setPageIndex }: Props) => {
    const router = useRouter()
    const { pathname, query } = router
    const { title, price }: any = query
    const prices = ['0-5', '5-10', '10-25', '25-']
    const categories = ['women', 'men', 'kids']
    const subcategories = ['pants', 'shirts', 'jeans', 'shoes']

    return (
        <div className="flex w-fit sx:flex-grow flex-col sx:flex-row sx:w-full gap-1 sx:gap-5">
            <div className="relative group/item">
                <button className="py-3 text-lg uppercase font-medium">
                    category
                </button>
                <div className="absolute z-10 invisible group-hover/item:visible">
                    <div className="rounded-lg relative overflow-hidden bg-white drop-shadow-lg">
                        <div className="w-64">
                            {categories.map((elem, index) => {
                                return (
                                    <Link key={index} className={
                                        title && title[0] === elem
                                            ?
                                            `col-span-2 lg:col-span-1 flex items-center px-4 py-1 text-12 lg:text-14 bg-slate-300`
                                            :
                                            `col-span-2 lg:col-span-1 flex items-center px-4 py-1 text-12 lg:text-14 hover:bg-slate-300`
                                    }
                                        href={`/products/${elem}`}>{elem}</Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {category &&
                <div className="relative group/item">
                    <button className="py-3 text-lg uppercase font-medium">
                        sub-category
                    </button>
                    <div className="absolute z-10 invisible group-hover/item:visible">
                        <div className="rounded-lg relative overflow-hidden bg-white drop-shadow-lg">
                            <div className="w-44">
                                {subcategories.map((elem, index)=> {
                                    return (
                                        <Link key={index} className={
                                            title && title[1] === elem
                                                ?
                                                `col-span-2 lg:col-span-1 flex items-center px-4 py-1 text-12 lg:text-14 bg-slate-300`
                                                :
                                                `col-span-2 lg:col-span-1 flex items-center px-4 py-1 text-12 lg:text-14 hover:bg-slate-300`
                                        }
                                            href={category && `/products/${category}/${elem}`}>{elem}</Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="relative group/item">
                <button className="py-3 text-lg uppercase font-medium">
                    price
                </button>
                <div className="absolute z-10 invisible group-hover/item:visible">
                    <div className="rounded-lg relative overflow-hidden bg-white drop-shadow-lg">
                        <div className="w-24">
                            {
                                prices.map((elem, index): any => {
                                    return (
                                        <button key={index} className={
                                            price && price === elem
                                                ?
                                                `w-full col-span-2 lg:col-span-1 flex items-center px-4 py-1 text-12 lg:text-14 bg-slate-300`
                                                :
                                                `w-full col-span-2 lg:col-span-1 flex items-center px-4 py-1 text-12 lg:text-14 hover:bg-slate-300`
                                        }
                                            onClick={() => {
                                                if (router.query.page) {
                                                    delete router.query.page
                                                    setPageIndex(0)
                                                }
                                                router.push({
                                                    pathname,
                                                    query: {
                                                        ...query,
                                                        price: elem
                                                    }
                                                })
                                            }}
                                        >{elem}$</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterProducts