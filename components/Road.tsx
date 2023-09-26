interface Road {
    category?: string,
    subcetagory?: string,
    title?: string
}

const Road = ({ category, subcetagory, title }: Road) => {
    return (
        <div className="hidden lg:flex mx-auto mt-4 mb-10 h-8 font-light text-xs flex items-center">
            <a className="py-2" href="/">Home</a>
            <span className="mx-3">&gt;</span>
            <a className="py-2" href="/products">Shop</a>
            <span className="mx-3">&gt;</span>
            {category && <>
                <a className="py-2" href={`/products/${category}`}>{category}</a>
                <span className="mx-3">&gt;</span>
            </>
            }
            {subcetagory && <>
                <a className="py-2" href={`/products/${category}/${subcetagory}`}>{subcetagory}</a>
                <span className="mx-3">&gt;</span>
            </>
            }
            <span className="py-2 font-semibold">{title}</span>
        </div>
    )
}

export default Road