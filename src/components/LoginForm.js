import React from 'react';

const LoginForm = ({ handleLoginForm, username, password }) => {
    return (
        <>
            <form onSubmit={handleLoginForm}>
                <div>
                    <label htmlFor={'username'}>username: </label>
                    <input {...username.input} />
                </div>
                <div>
                    <label htmlFor={'password'}>password: </label>
                    <input {...password.input} />
                </div>
                <button>login</button>
            </form>
        </>
    );
};

export default LoginForm;
