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

const deleteBlog = async (id, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` }
    };

    await axios.delete(`${baseUrl}/${id}`, config);
};

const updateBloglikes = async blog => {
    const obj = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    };

    await axios.put(`${baseUrl}/${blog.id}`, obj);
};

export { getAllBlogs, addNewBlog, deleteBlog, updateBloglikes };
