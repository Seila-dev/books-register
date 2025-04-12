import React from 'react'
import styled from 'styled-components'
import BooksComponent from '../BooksComponent'

export const Home: React.FC = () => {
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
    min-height: 100vh;
    h1 {
        color: white;
    }

    p {
        color: white;
    }
`