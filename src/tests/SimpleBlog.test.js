import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import SimpleBlog from '../components/SimpleBlog';

describe('<SimpleBlog />', () => {
    const blog = {
        title: 'Title',
        author: 'Author',
        likes: 2
    };

    test('Blog renders...', () => {
        const component = render(<SimpleBlog blog={blog} />);

        expect(component.container).toHaveTextContent('Title Author');
        expect(component.container).toHaveTextContent('blog has 2 likes');
    });

    test('Button works...', () => {
        const mockHandler = jest.fn();

        const { getByText } = render(
            <SimpleBlog blog={blog} onClick={mockHandler} />
        );

        const button = getByText('like');
        fireEvent.click(button);
        fireEvent.click(button);

        expect(mockHandler.mock.calls.length).toBe(2);
    });
});
