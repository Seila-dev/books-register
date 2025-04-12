import React from 'react';
import styled from 'styled-components';
import { BookForm } from '../bookform';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 8px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

const Button = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const BooksComponent: React.FC = () => {
    return (
        <Container>
            <div>
                <Title>Minha Biblioteca</Title>
                <p className='description'>Gerencie seus livros de forma simples e eficiente.</p>
            </div>
            <ButtonGroup>
                <Button>Adicionar</Button>
                <BookForm></BookForm>
            </ButtonGroup>
        </Container>
    );
};

export default BooksComponent;