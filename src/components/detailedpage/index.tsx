import { useState, useEffect } from "react";
import styled from "styled-components";
import { StarRate } from "../StarRate";
import editIcon from '../../assets/edit.png';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import closeIcon from '../../assets/close.png';
import api from '../../services/api';

export const DetailedPage = () => {
    interface Data {
        id: number;
        title: string;
        image: string;
        stars: number;
        description?: string;
        startedreading?: string;
        endedreading?: string;
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Data>();
    const [updateEvent, setUpdateEvent] = useState<boolean>(false);
    const [product, setProduct] = useState<Data | null>(null);

    const { id } = useParams();

    async function getProduct() {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
    }

    useEffect(() => {
        if (id) {
            getProduct();
        }
    }, [id]);

    useEffect(() => {
        if (product) {
            setValue('title', product.title);
            setValue('description', product.description || '');
            setValue('startedreading', product.startedreading || '');
            setValue('endedreading', product.endedreading || '');
        }
    }, [product, setValue]);

    const updateEvents = () => {
        setUpdateEvent(!updateEvent);
    }

    const handleSubmitForm = async (data: Data) => {
        try {
            await api.put(`/products/${id}`, data);

            // Atualiza o estado local com os novos dados
            setProduct(prevState => ({
                ...prevState!,
                ...data
            }));
            setUpdateEvent(false); // Fecha o modo de edição
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return <div>Loading...</div>
    }

    // Monta a URL da imagem para que ela seja acessível
    const imageUrl = product.image ? `http://localhost:3000/public/${product.image}` : ''; // Ajuste o caminho conforme necessário

    return (
        <Section backgroundImage={imageUrl}>
            <div className="image-slider">
                <div className="editProduct">
                    <button onClick={() => updateEvents()}><img src={editIcon} alt="edit icon" /></button>
                </div>
                <div className="image-prompt">
                    {/* Renderiza a imagem com o caminho completo */}
                    <img src={imageUrl} alt="Imagem do produto" />
                </div>
                <h1 className="product-title">{product.title}</h1>
                <div className="stars desktop">
                    <StarRate productId={product.id.toString()} />
                </div>
            </div>
            <DataContainer className="container">
                <div className="hidden-title">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="stars responsive">
                        <StarRate productId={product.id.toString()} />
                    </div>
                </div>
                <GenreSection>
                    <h2>Gênero</h2>
                    <div className="categories">
                        <p>Aventura</p>
                    </div>
                </GenreSection>
                <div className="description">
                    <h2>Descrição</h2>
                    <p>{product.description}</p>
                </div>
                <div className="date">
                    <h2>Data de início e final da leitura</h2>
                    <p>{product.startedreading} - {product.endedreading}</p>
                </div>
            </DataContainer>
            {updateEvent &&
                <Lightbox>
                    <div className="white-box">
                        <div className="close-container">
                            <h3>Update Events</h3>
                            <img src={closeIcon} alt="Close icon" onClick={() => setUpdateEvent(!updateEvent)} />
                        </div>
                        <p>* indica obrigatório</p>
                        <label htmlFor="text">Título *</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="título"
                            maxLength={30}
                            {...register("title", {
                                required: true
                            })}
                        />
                        {errors.title && <ErrorMessage>é necessário escrever algo aqui</ErrorMessage>}
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            placeholder="descrição"
                            {...register("description")}
                        />

                        <label htmlFor="start">Início de leitura</label>
                        <input
                            type="text"
                            id="start"
                            maxLength={10}
                            placeholder="DD/MM/AAAA"
                            {...register("startedreading")}
                        />
                        <label htmlFor="end">Fim de leitura</label>
                        <input
                            type="text"
                            id="end"
                            maxLength={10}
                            placeholder="DD/MM/AAAA"
                            {...register("endedreading")}
                        />

                        <button type="submit" className="save-btn" onClick={handleSubmit(handleSubmitForm)}>Salvar alterações</button>
                    </div>
                </Lightbox>
            }
        </Section>
    );
};

// Styled-components continuam iguais

// Styled-components e outros componentes seguem sem alterações


const Section = styled.section<{ backgroundImage: string }>`
  .image-slider {
    // background: linear-gradient(to right, #ccc 25%, black);
    background: var(--almost-black);
    height: 300px;
    position: relative;
    width: 100%;
    margin-bottom: 150px;
  }
  .image-slider .editProduct {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px;
  }   
  .image-slider .editProduct button {
    padding: 10px;
    cursor: pointer;
    background: white;
    border: 1px solid var(--black);
    border-radius: 50%;
    img{
        display: flex;
        width: 30px;
    }
  }  
  .image-prompt {
    width: 230px;
    position: absolute;
    top: 80px;
    left: 15%;
  }
  .image-slider .image-prompt img {
    width: 100%;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .image-slider .product-title {
    position: absolute;
    top: 75%;
    left: 550px;
    width: fit-content;
    font-size: 35px;
    color: white;
  }
    .stars.desktop{
        position: absolute;
        top: 60%;
        left: 550px;
    }
    @media (max-width: 1020px){
        .image-slider .product-title {
            font-size: 25px;
            width: 350px;
        }
        .stars.desktop, .image-slider .product-title{
            left: 400px;
        }
    }
    @media (max-width: 768px){
        .stars.responsive{
            display: flex;
        }
        .image-slider .product-title, .stars.desktop {
            display: none;
        }
        .image-slider {
            background: transparent;
            border: none;
            box-shadow: none;
            background-image: url(${props => props.backgroundImage});
            background-position: top center;
            background-size: cover;
            background-repeat: no-repeat;
            margin-bottom: 0;
            height: 500px;
        }
        .image-slider::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40%;
            background: linear-gradient(to top, #fff, rgba(0, 0, 0, 0));
        }
        .image-slider img {
            display: none;  
        }
    }
    @media (max-width: 367px) {
        .image-slider::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            background: linear-gradient(to top, #f2bba6, rgba(0, 0, 0, 0));
        }
    }
`;

const DataContainer = styled.div`
    padding: 30px 100px;
    .hidden-title{
        display: none;
    }
    .description{
        margin: 30px 0;
    }
    @media (max-width: 768px){
        padding: 30px 50px;
        h2{
            font-size: 18px;
        }
        .hidden-title{
            display: flex;
            flex-direction: column;
            width: 100%;
            border-bottom: 1px solid gray;
            padding: 20px;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: 700;
        }
        .hidden-title h1{
            margin-bottom: 10px;
            text-align: center;
        }
    }
    @media (max-width: 550px) {
        padding: 10px 10px;
        .hidden-title{
            font-size: 15px;
        }
    }
`

const GenreSection = styled.div`
    display: flex;
    align-items: center;
    p{
        margin: 20px
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