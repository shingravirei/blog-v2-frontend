import React, { useState, useEffect } from 'react';
import { getAllBlogs } from './services/blogs';
import { login } from './services/login';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import AddBlog from './components/AddBlog';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleLoginForm = async e => {
        e.preventDefault();

        try {
            const user = await login({ username, password });

            setUser(user);

            localStorage.setItem('user', JSON.stringify(user));
            setUserIsLoggedIn(!userIsLoggedIn);
        } catch (err) {
            setErrorMessage('invalid username or password');

            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

        setUsername('');
        setPassword('');
    };

    const logOut = () => {
        setUserIsLoggedIn(!userIsLoggedIn);
        localStorage.clear();
    };

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('user'));

        if (localUser) {
            setUser(localUser);
            setUserIsLoggedIn(prevState => !prevState);
        }
    }, []);

    useEffect(() => {
        if (userIsLoggedIn) {
            const receivedBlogs = getAllBlogs();

            receivedBlogs.then(blogs => {
                const filteredBlogs = blogs.filter(
                    blog => blog.user[0].username === user.username
                );

                setBlogs(filteredBlogs);
            });
        }
    }, [userIsLoggedIn, user]);

    return (
        <div>
            <h1>Blogs</h1>

            {successMessage && <h2>{successMessage}</h2>}
            {errorMessage && <h2>{errorMessage}</h2>}

            {userIsLoggedIn ? (
                <>
                    <strong>{user.name} logged in</strong>
                    <button onClick={logOut}>log out</button>
                    <AddBlog
                        user={user}
                        setBlogs={setBlogs}
                        setSuccessMessage={setSuccessMessage}
                        setErrorMessage={setErrorMessage}
                    />
                    <BlogList blogs={blogs} />
                </>
            ) : (
                <>
                    <LoginForm
                        handleLoginForm={handleLoginForm}
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                    />
                </>
            )}
        </div>
    );
};

export default App;
