const API_KEY = '32048668-e2fb2d2180cb5d2e63ce535ce';
const BASE_URL = 'https://pixabay.com/api';

export default function fetchData(query, page,perPage) {
    return fetch(`${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(new Error(`No response from server`));
    });
};

