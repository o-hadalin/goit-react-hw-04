import axios from 'axios';

const API_BASE_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'Zgzj0uk2abhWTnFDfhUj5I9C1L4TilX21NNAZ0npar4';

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: 12,
        client_id: ACCESS_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images. Please try again later.');
  }
};
