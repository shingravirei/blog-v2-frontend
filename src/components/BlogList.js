import React from 'react';

const BlogList = ({ blogs }) => {
    const renderBlogs = () => {
        return blogs.map(blog => {
            return (
                <p key={blog.id}>
                    {blog.title} - {blog.author}
                </p>
            );
        });
    };

    return renderBlogs();
};

export default BlogList;
