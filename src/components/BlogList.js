import React from 'react';

import Blog from './Blog';

const BlogList = ({ blogs, setBlogs, token }) => {
    const renderBlogs = () => {
        return blogs
            .sort((a, b) => {
                if (a.likes < b.likes) {
                    return 1;
                }

                if (a.likes > b.likes) {
                    return -1;
                }

                return 0;
            })
            .map(blog => (
                <div key={blog.id}>
                    <Blog
                        id={blog.id}
                        title={blog.title}
                        author={blog.author}
                        url={blog.url}
                        likes={blog.likes}
                        setBlogs={setBlogs}
                        token={token}
                    />
                </div>
            ));
    };

    return renderBlogs();
};

export default BlogList;
