import { useState } from 'react';
import styled from 'styled-components';
import { BookForm } from '../bookform';
import { Books } from '../books';

export const BooksComponent = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleOpenModal = () => {
        setOpenModal(!openModal);
    };

    return (
        <Container>
            <Header>
                <div>
                    <Title>Minha Biblioteca</Title>
                    <Description>Gerencie seus livros de forma simples e eficiente.</Description>
                </div>
                <ButtonGroup>
                    <Button onClick={handleOpenModal}>Adicionar</Button>

                </ButtonGroup>
            </Header>
            {openModal && <Overlay onClick={() => handleOpenModal()} />}
            {openModal && (
                <div>
                    <BookForm></BookForm>
                </div>
            )}

            <Books />

        </Container>
    );
};

const Overlay = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 4;
      pointer-events: all;
    `;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    color: black;
`;

const Header = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    gap: 10px;
`

const Title = styled.h1`
    font-size: 24px;

    @media (max-width: 500px) {
        font-size: 1.1rem;
    }
`;

const Description = styled.p`
    opacity: 0.8;

    @media (max-width: 500px) {
        font-size: 14px;
    }
`

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Button = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    width: 100%;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    @media(max-width: 768px){
        padding: 15px 5px;
        font-size: 12px;
        height: fit-content;
    }
`;
