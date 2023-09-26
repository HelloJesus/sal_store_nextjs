import useSWR from 'swr/immutable'
import fetcher from '@/lib/fetcher'

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/products`, fetcher)

    return { data, error, isLoading, mutate }
}

export default useCurrentUser