import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_HOST}/current`, fetcher, {
        revalidateIfStale: false,
    })
    // console.log(data, error?.message)
    return { data, error, isLoading, mutate }
}

export default useCurrentUser