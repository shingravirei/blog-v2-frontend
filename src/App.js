import React, { useState, useEffect } from 'react';
import { getAllBlogs } from './services/blogs';
import { login } from './services/login';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import AddBlog from './components/AddBlog';
import Toggleable from './components/Togglable';
import { useField } from './hooks';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const username = useField('text', 'username');
    const password = useField('password', 'password');
    const [user, setUser] = useState(null);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleLoginForm = async e => {
        e.preventDefault();

        try {
            const user = await login({
                username: username.input.value,
                password: password.input.value
            });

            setUser(user);

            localStorage.setItem('user', JSON.stringify(user));
            setUserIsLoggedIn(!userIsLoggedIn);
        } catch (err) {
            setErrorMessage('invalid username or password');

            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

        username.reset();
        password.reset();
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
                    <Toggleable buttonLabel={'New Blog'}>
                        <AddBlog
                            user={user}
                            setBlogs={setBlogs}
                            setSuccessMessage={setSuccessMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </Toggleable>

                    <BlogList
                        blogs={blogs}
                        setBlogs={setBlogs}
                        token={user.token}
                    />
                </>
            ) : (
                <>
                    <LoginForm
                        handleLoginForm={handleLoginForm}
                        username={username}
                        password={password}
                    />
                </>
            )}
        </div>
    );
};

export default App;
