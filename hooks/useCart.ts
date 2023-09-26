import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useFavorites = (user ='') => {
    const { data, error, isLoading, mutate } = useSWR(user && `${process.env.NEXT_PUBLIC_API_HOST}/cart`, fetcher)

    return { data, error, isLoading, mutate }
}

export default useFavorites