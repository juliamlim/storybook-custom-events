import styled from '@emotion/styled';

const colors = {
    primary: '#4ABE9D',
    secondary: '#1FA6FD',
    error: '#E66962',
    grey: '#ddd'
};

const spacing = 4;

export const Card = styled.div`
    flex: 1 0 0;
    max-width: 550px;
    display: inline-block;
    padding: ${spacing * 3}px;
    margin: ${spacing * 3}px;
    border-radius: ${spacing}px;
    box-shadow: 0 5px 15px -10px black;
    &.secondary {
        background-color: ${colors.grey};
        box-shadow: none;
    }
    @media(max-width: 860px) {
        flex: 1 100%;
    }
`;

export const Flex = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-flow: row wrap;
`;

export const Button = styled.button`
    margin: ${spacing * 3}px ${spacing * 3}px 0;
    padding: ${spacing * 2}px ${spacing * 4}px;
    color: white;
    font-weight: bold;
    background-color: ${colors.primary};
    border: none;
    border-radius: ${spacing}px;
    &.secondary {
        color: ${colors.secondary};
        background-color: transparent;
        border: 1px solid ${colors.secondary};
    }
    &.error {
        background-color: ${colors.error};
    }
`;

const forms = `
    width: 100%;
    display: block;
    margin: ${spacing}px 0 ${spacing * 2}px;
    padding: ${spacing}px ${spacing + 2}px;
    background-color: transparent;
    border: 1px solid ${colors.grey};
    border-radius: ${spacing}px;
`;

export const Input = styled.input`
    ${forms}
`;

export const Textarea = styled.textarea`
    ${forms}
    resize: vertical;
`;