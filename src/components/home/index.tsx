import styled from 'styled-components'
import { Product } from '../product'

export const Home = () => {

    return (
        <>
            <MainContainer>
                <h2 className='section-title'>Biblioteca - Todos os conteúdos</h2>
                <Section>
                    <Product />

                    <AddProduct>
                        <div><p>+</p></div>
                    </AddProduct>
                </Section>
            </MainContainer>
        </>
    )
}

const MainContainer = styled.main`
    
    .section-title{
        text-align: center;
        margin: 30px 0 50px 0;
        font-size: 30px;
    }
    @media(max-width: 544px){
        padding: 5px;
        .section-title{
            font-size: 20px;
        }
    }
`

const Section = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    @media (max-width: 550px){
        padding: 10px;
        
    }
`



const AddProduct = styled.div`
    background: gray;
    width: 300px;
    height: 425px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    &:hover div{
        opacity: 0.8;
    }
    @media (max-width: 1020px){
        width: 200px;
        height: 285px;
    }
    @media (max-width: 768px){
        width: 150px;
        height: 215px;
    }
    @media (max-width: 550px) {
        width: 120px;
        height: 200px;
    }
    div {
        transition: 0.1s ease-in;
        display: flex;
        z-index: 2;
        align-items: center;
        justify-content: center;
        background: #ccc;
        opacity: 0.2;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid black;
    }
    p{
        font-size: 50px;
        color: #000;
    }
`