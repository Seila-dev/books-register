import { useState } from 'react';
import styled from 'styled-components';
import { BookForm } from '../bookform';
import { Books } from '../books';

export const BooksComponent = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    return (
        <Container>
            <Header>
                <div>
                    <Title>Minha Biblioteca</Title>
                    <Description>Gerencie seus livros de forma simples e eficiente.</Description>
                </div>
                <ButtonGroup>
                    <Button>Adicionar</Button>

                </ButtonGroup>
            </Header>
            {openModal && (
                <div>
                    <BookForm></BookForm>
                </div>
            )}

            <Books />

        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;;
    align-items: center;
    width: 100%;
    border-radius: 8px;
`;

const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const Description = styled.p`
    opacity: 0.8;
`

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
