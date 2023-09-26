import useSWR from 'swr/immutable'
import fetcher from '@/lib/fetcher'

const useProduct = (id: string | undefined) => {
    const { data: product, error, isLoading, mutate } = useSWR(id && `${process.env.NEXT_PUBLIC_API_HOST}/product/${id}`, fetcher)

    return { product, error, isLoading, mutate }
}

export default useProduct