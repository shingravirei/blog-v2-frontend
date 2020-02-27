import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

const getAllBlogs = async () => {
    const blogs = await axios.get(baseUrl);

    return blogs.data;
};

const addNewBlog = async (newObject, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` }
    };

    const response = await axios.post(baseUrl, newObject, config);

    return response.data;
};

export { getAllBlogs, addNewBlog };
