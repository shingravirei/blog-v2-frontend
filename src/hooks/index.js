import { useState } from 'react';

const useField = (type, name) => {
    const [value, setValue] = useState('');
    const required = true;
    const id = name;

    const onChange = event => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return {
        input: { type, value, onChange, required, id, name },
        reset
    };
};

export { useField };
