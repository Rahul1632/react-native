import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

export const fetchUsers = ({ pageParam = 1 }) =>
    api.get(`/users?since=${pageParam}`).then(res => res.data);

export const fetchUserDetails = async ({ queryKey }) => {
    const [, id] = queryKey;
    const response = await api.get(`/users/${id}`);
    return response.data;
};
