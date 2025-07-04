import axios from "axios";


const API_BASE = 'https://api.unsplash.com';
const ACCESS_KEY = 's3smPZoWPtlPvL1jdE93hcQt1-46cPogoqKTNG94uEA';

export const searchImage = async (query: string) => {
    const res = await axios.get(`${API_BASE}/search/photos`, {
        params: { query, per_page: 30 },
        headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
        },
    });
    return res.data.results;
};