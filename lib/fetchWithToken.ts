import axios from 'axios';

const fetchWithToken = async (url:any, token: any) => {
    // const [url] = params
    const urlFull = url + token
    return await axios.get(urlFull).then((res) => res.data)
}

export default fetchWithToken