import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
    params: {
        hl: 'en',
        gl: 'US',
    },
    headers: {
        // 'X-RapidAPI-Key': import.meta.env.REACT_APP_YOUTUBE_API_KEY,
        'X-RapidAPI-Key': 'da1710a23fmsha6ec4ff7deb4163p11be4ajsnc2351113687f',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options)
    return data
}