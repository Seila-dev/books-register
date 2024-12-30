import styled from 'styled-components'
import { Product } from '../product'
// import { products, productsDetailed } from '../../mocks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import closeIcon from '../../assets/close.png';

export const Home = () => {
    interface Data {
        title: string;
        image: string;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Data>();
    const [updateEvent, setUpdateEvent] = useState<boolean>(false);

    const handleSubmitForm = (data: Data) => {
        console.log(data)
        return data
    }

    const updateEvents = () => {
        setUpdateEvent(!updateEvent);
    }


    return (
        <>
            <MainContainer>
                <h2 className='section-title'>Biblioteca - Todos os conteúdos</h2>
                <Section>
                    <Product />

                    <AddProduct onClick={updateEvents} >
                        <div><p>+</p></div>
                    </AddProduct>
                </Section>

                {updateEvent &&
                    <Lightbox>
                        <div className="white-box">
                            <div className="close-container">
                                <h3>Update Events</h3>
                                <img src={closeIcon} alt="Close icon" onClick={() => setUpdateEvent(!updateEvent)} />
                            </div>
                            <label htmlFor="text">Título *</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="título"
                                maxLength={30}
                                {
                                ...register("title", {
                                    required: true
                                })
                                }
                            />
                            {errors.title && <ErrorMessage>é necessário escrever algo aqui</ErrorMessage>}

                            <button type="submit" className="save-btn" onClick={handleSubmit(handleSubmitForm)}>Salvar alterações</button>
                        </div>
                    </Lightbox>
                }


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
        padding: 0;
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
        padding: 0gpx;
        
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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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

const Lightbox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    
    .white-box{
        background: white;
        display: flex;
        flex-direction: column;
        width: 500px;
        height: 500px;
        padding: 20px;
        margin: 10px;   
    }
    .white-box .close-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .white-box .close-container img{
        width: 40px;
        cursor: pointer;
    }
    .white-box label{
        margin: 5px 0;
    }
    .white-box input, textarea{
        padding: 10px;
        outline: none;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    .white-box .save-btn{
        margin-top: 20px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background: #ccc;
    }
`

const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
`