import React, { useState } from 'react';

import { addNewBlog } from '../services/blogs';

const AddBlog = ({
    toggle,
    user,
    setBlogs,
    setErrorMessage,
    setSuccessMessage
}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddBlog = async e => {
        e.preventDefault();
        const newBlog = { title, author, url };

        setTitle('');
        setUrl('');
        setAuthor('');

        try {
            setLoading(true);
            const response = await addNewBlog(newBlog, user.token);

            setBlogs(prevState => prevState.concat(response));

            setLoading(false);

            setSuccessMessage(
                `New blog ${response.title} by ${response.author} added!'`
            );

            toggle();
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } catch (err) {
            setErrorMessage('Something went wrong');

            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <div>
            <h3>Add New Blog</h3>
            <form onSubmit={handleAddBlog}>
                <div>
                    <label htmlFor={'title'}>title: </label>
                    <input
                        id={'title'}
                        value={title}
                        onChange={({ target }) => {
                            setTitle(target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor={'author'}>author: </label>
                    <input
                        id={'author'}
                        value={author}
                        onChange={({ target }) => {
                            setAuthor(target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor={'url'}>url: </label>
                    <input
                        id={'url'}
                        value={url}
                        onChange={({ target }) => {
                            setUrl(target.value);
                        }}
                    />
                </div>
                <button>add</button>
            </form>
            <div>{loading && <h4>...SPINNER...</h4>}</div>
        </div>
    );
};

export default AddBlog;
