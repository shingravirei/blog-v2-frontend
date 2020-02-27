import axios from 'axios';

const login = async credendials => {
    const response = await axios.post(
        'http://localhost:3001/api/login',
        credendials
    );

    return response.data;
};

export { login };
