import axios from 'axios';

interface Error {
    status?: number;
    code?: number;
}

const fetcher = async (url: string) => {
    return await axios.get(url)
        .then((res) => { return res.data })
        .catch(error => {
            if (error.response.data === "Not authorized!"){
                throw new Error(error.response.data)
            }
        })
}

export default fetcher