import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Blog from '../components/Blog';

describe('<Blog />', () => {
    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'google.com',
        likes: 1
    };

    let component;

    beforeEach(() => {
        component = render(
            <Blog
                title={blog.title}
                author={blog.author}
                url={blog.url}
                likes={blog.likes}
            />
        );
    });

    test('Only Title and Author render in the first time...', () => {
        expect(component.container).toHaveTextContent('Title - Author');
    });

    test('After clicking button the full Blog is displayed', () => {
        const button = component.container.querySelector('.show-or-hide');

        fireEvent.click(button);

        const div = component.container.querySelector('.hidden-content');

        expect(div).not.toHaveStyle('display: none');
        expect(component.container).toHaveTextContent('likes - 1');
    });
});
