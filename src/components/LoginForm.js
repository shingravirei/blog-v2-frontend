import React from 'react';

const LoginForm = ({
    handleLoginForm,
    username,
    password,
    setUsername,
    setPassword
}) => {
    return (
        <>
            <form onSubmit={handleLoginForm}>
                <div>
                    <label htmlFor={'username'}>username: </label>
                    <input
                        id={'username'}
                        name={'username'}
                        typ={'text'}
                        required={true}
                        value={username}
                        onChange={({ target }) => {
                            setUsername(target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor={'password'}>password: </label>
                    <input
                        id={'password'}
                        name={'password'}
                        type={'password'}
                        required={true}
                        value={password}
                        onChange={({ target }) => {
                            setPassword(target.value);
                        }}
                    />
                </div>
                <button>login</button>
            </form>
        </>
    );
};

export default LoginForm;
