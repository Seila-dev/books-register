import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { StarRate } from "../StarRate";
import editIcon from '../../assets/edit.png';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import closeIcon from '../../assets/close.png';

export const DetailedPage = () => {
    interface Data {
        title: string;
        description?: string;
        startedReading?: string;
        endedReading?: string;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Data>();
    const [inputValue, setInputValue] = useState<string>("");
    const [updateEvent, setUpdateEvent] = useState<boolean>(false);
    const [product, setProduct] = useState<{
        id: number,
        title: string,
        image: string,
        description: string,
        startedReading: string,
        endedReading: string
        | null
    }>({
        id: 0,
        title: "",
        image: "",
        description: "",
        startedReading: "",
        endedReading: ""
    });
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { id } = useParams();
    // const [product, setProduct] = useState<{
    //     image: string;
    //     title: string;
    //     id: number;
    //     genre: string;
    //     description: string;
    //     startedReading: string;
    //     endedReading: string;
    // } | null>(null); 

    // Carregar dados do localStorage
    useEffect(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            const products = JSON.parse(savedProducts);

            const foundProduct = products.find((product: { id: number }) => product.id === parseInt(id!));

            if (foundProduct) {
                setProduct(foundProduct);
            }
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (newValue.length <= 30) {
            setInputValue(newValue);

            if (inputRef.current) {
                const newWidth = Math.max(80, newValue.length * 10);
                inputRef.current.style.width = `${newWidth}px`
            }
        }
    };

    const updateEvents = () => {
        setUpdateEvent(!updateEvent);
    }

    const handleSubmitForm = (data: Data) => {
        if (product) {
            const updatedProduct = {
                ...product,
                title: data.title,
                description: data.description || "",
                startedReading: data.startedReading || "",
                endedReading: data.endedReading || ""
            };
            setProduct(updatedProduct);

            // Salvar os dados no localStorage
            localStorage.setItem(`product-${updatedProduct.id}`, JSON.stringify(updatedProduct));

            const savedProducts = localStorage.getItem('products');
            if (savedProducts) {
                const products = JSON.parse(savedProducts);
                const updatedProducts = products.map((product: any) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
                localStorage.setItem('products', JSON.stringify(updatedProducts));
            }
        }
    };

    console.log(product)



    return (
        <Section backgroundImage={product.image}>
            <div className="image-slider">
                <div className="editProduct">
                    <button onClick={() => updateEvents()}><img src={editIcon} alt="edit icon" /></button>
                </div>
                <div className="image-prompt">
                    <img src={product.image} alt="Imagem" />
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
                        <input
                            ref={inputRef}
                            id="txt"
                            className="category-input"
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="gênero"
                        />
                    </div>
                </GenreSection>
                <div className="description">
                    <h2>Descrição</h2>
                    <p>{product.description}</p>
                </div>
                <div className="date">
                    <h2>Data de início e final da leitura</h2>
                    <p>{product.startedReading} - {product.endedReading}</p>
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
                            {
                            ...register("title", {
                                required: true
                            })
                            }
                        />
                        {errors.title && <ErrorMessage>é necessário escrever algo aqui</ErrorMessage>}
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            placeholder="descrição"
                            {
                            ...register("description")
                            }
                        />

                        <label htmlFor="start">inicio de leitura </label>
                        <input
                            type="text"
                            id="start"
                            maxLength={10}
                            placeholder="DD/MM/AAAA"
                            {
                            ...register("startedReading")
                            }
                        />
                        <label htmlFor="end">Fim de leitura</label>
                        <input
                            type="text"
                            id="end"
                            maxLength={10}
                            placeholder="DD/MM/AAAA"
                            {
                            ...register("endedReading")
                            }
                        />

                        <button type="submit" className="save-btn" onClick={handleSubmit(handleSubmitForm)}>Salvar alterações</button>
                    </div>
                </Lightbox>
            }
        </Section>
    );
};

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
            background: linear-gradient(to top, #f2bba6, rgba(0, 0, 0, 0));
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
  
  .categories {
    background: orangered;
    width: 50px;
    overflow-y: visible;
    border-radius: 5px;
    margin-left: 30px;
  }
  .category-input {
    min-width: 50px;
    padding: 8px;
    border: none;
    background: orangered;
    color: white;
    outline: none;
    border-radius: 5px;
    transition: width 0.2s ease;
    &::placeholder {
      color: #ccc;
    }
  }
`;

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