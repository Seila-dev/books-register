import React from 'react'
import styled from 'styled-components'
import { BooksComponent } from '../BooksComponent'
import { useBooks } from '../../contexts/BooksContext';
import { useCategories } from '../../contexts/CategoriesContext';

export const Home = () => {
    const { loading: booksLoading } = useBooks();
    const { loading: categoriesLoading } = useCategories();

  if (booksLoading || categoriesLoading) {
    return <p>Carregando...</p>;
  }
    return (
        <Container>
            <BooksComponent />
        </Container>
    )
}

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    h1 {
        color: white;
    }

    p {
        color: white;
    }
`