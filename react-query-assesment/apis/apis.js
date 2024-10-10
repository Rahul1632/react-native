import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

export const fetchUsers = async ({ pageParam = 0 }) => {
    const limit = 10;
    const response = await api.get(`/users?since=${pageParam}&per_page=${limit}`);
    const users = response.data;

    return {
        users,
        hasMore: users.length === limit,
        nextPage: users.length > 0 ? users[users.length - 1].id : undefined,
    };
};

export const fetchUserDetails = async ({ queryKey }) => {
    const [, id] = queryKey;
    const response = await api.get(`/users/${id}`);
    return response.data;
};

