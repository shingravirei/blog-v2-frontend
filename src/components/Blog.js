import React, { useState, useEffect, useRef } from 'react';

import { deleteBlog, updateBloglikes } from '../services/blogs';

const Blog = ({ id, token, title, author, url, likes, setBlogs }) => {
    const [visible, setVisible] = useState(false);
    const [compLikes, setCompLikes] = useState(likes);

    const didMountRef = useRef(false);

    const showOrHide = { display: visible ? '' : 'none' };

    const handleShowOrHide = () => {
        setVisible(!visible);
    };

    const handleUpdateLikes = () => {
        setCompLikes(compLikes + 1);
    };

    const handleRemove = () => {
        const confirm = window.confirm(`Remove ${title}?!`);

        if (confirm) {
            deleteBlog(id, token);

            setBlogs(prevState => {
                return prevState.filter(prevBlog => !(prevBlog.id === id));
            });
        }
    };

    useEffect(() => {
        if (didMountRef.current) {
            updateBloglikes({
                id,
                title,
                author,
                url,
                likes: compLikes
            });
        } else didMountRef.current = true;
    }, [id, title, url, author, compLikes]);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    return (
        <div style={blogStyle}>
            <p onClick={handleShowOrHide} className={'show-or-hide'}>
                {title} - {author}
            </p>
            <div style={showOrHide} className={'hidden-content'}>
                <p>
                    <a href={url}>{url}</a>
                </p>

                <p>
                    <span>likes - {compLikes}</span>
                    <button onClick={handleUpdateLikes}>like</button>
                    <button onClick={handleRemove}>remove</button>
                </p>
            </div>
        </div>
    );
};

export default Blog;
