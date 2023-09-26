import axios from 'axios';

const fetcherParams = async (data?: any) => await axios(data).then((res) => res.data)

export default fetcherParams