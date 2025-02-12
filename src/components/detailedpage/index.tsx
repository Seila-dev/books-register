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
        categories: Category[];
    }

    interface SemiCategory {
        name: string;
    }

    interface Category {
        id: number;
        name: string;
        category: SemiCategory;
    }

    // interface CategoryResponse {
    //     // Defina as propriedades da categoria aqui
    //     id: number;
    //     name: string;
    //     // outras propriedades...
    //   }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Data>();
    const [updateEvent, setUpdateEvent] = useState<boolean>(false);
    const [product, setProduct] = useState<Data | null>(null);
    const [categoryEvent, setCategoryEvent] = useState<boolean>(false);
    const [category, setCategory] = useState<Category[]>([])
    const [newCategory, setNewCategory] = useState<string>('');

    const { id } = useParams();

    async function getProduct() {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
    }
    async function getCategories() {
        const response = await api.get(`/products/${id}/categories`);
        setCategory(response.data);
    }

    useEffect(() => {
        if (id) {
            getProduct();
            getCategories();
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

            setProduct(prevState => ({
                ...prevState!,
                ...data
            }));
            setUpdateEvent(false);
        } catch (error) {
            console.log(error);
        }
    };

    const updateCategory = () => {
        setCategoryEvent(!categoryEvent);
    }

    const handleCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory(e.target.value);
    }

    const handleCategoryForm = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        if (newCategory.trim()) {
            try {
                const response = await api.post<Category>(`/products/${id}/categories`, {
                    name: newCategory,
                  });
                  
                  console.log("Categoria criada:", response.data);
                  
                  // Atualize o estado com as categorias do produto (não apenas a categoria criada)
                //   setCategory(prev => {
                //     const updatedCategories = response.data.product.categories || [];
                //     return updatedCategories;  // ou [...prev, createdCategory] caso queira adicionar a nova
                //   });
                  
                  
                  
                setNewCategory('');
            } catch (error) {
                console.error('Erro ao salvar a categoria:', error);
            }
        } else {
            console.log("Categoria inválida");
        }
    }
   
    

    useEffect(() => {
        console.log(category)
    }, [])

    if (!product) {
        return <Loading>Loading...</Loading>
    }

    const imageUrl = product.image ? `https://books-register-api.onrender.com/public/${product.image}` : ''
    return (
        <Section backgroundImage={imageUrl}>
            <div className="image-slider">
                <div className="editProduct">
                    <button onClick={() => updateEvents()}><img src={editIcon} alt="edit icon" /></button>
                </div>
                <div className="image-prompt">
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


                <div className="other-informations">
                    <div className="date">
                        <h3>Tempo assistido:</h3>
                        {product.startedreading && product.endedreading && (
                            <p><i>{product.startedreading} - {product.endedreading}</i></p>
                        )}
                        {product.startedreading === '' && (
                            <p><i>Ainda não começou a assistir</i></p>
                        )}
                    </div>
                    <GenreSection>
                        <h3>Gêneros</h3>
                        <div className="categories">
                            { category.length > 0 ? (
                                category.map((categoryItem, index) => (
                                    <div className="category" key={index}>
                                        <p>{categoryItem.name}</p>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                            {categoryEvent &&
                                <div className="category">
                                    <input
                                        type="text"
                                        className="input"
                                        value={newCategory}
                                        onChange={handleCategoryInput}
                                    />
                                    <button type="button" className="send-btn" onClick={handleCategoryForm}  ><svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.024,1.398,80.367l21.593,89.001 c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915 c-11.271,6.452-19.491,17.393-22.554,30.015L1.398,431.633c-9.283,38.257,29.507,70.691,65.569,54.534l416.961-186.83 C521.383,282.554,521.333,229.424,483.927,212.664z M468.609,265.151l-416.96,186.83c-7.618,3.417-15.814-3.398-13.845-11.516 l21.593-89.001c0.647-2.665,2.383-4.975,4.761-6.337l83.685-47.915c31.857-18.239,31.887-64.167,0-82.423l-83.685-47.916 c-2.379-1.362-4.115-3.672-4.761-6.337L37.804,71.535c-1.945-8.016,6.128-14.975,13.845-11.514L468.61,246.85 C476.522,250.396,476.542,261.596,468.609,265.151z"></path> <path d="M359.268,238.907l-147.519-66.1c-9.444-4.231-20.523-0.005-24.752,9.435c-4.231,9.44-0.006,20.523,9.434,24.752 L305.802,256l-109.37,49.006c-9.44,4.231-13.664,15.313-9.434,24.752c4.231,9.443,15.312,13.663,24.752,9.435l147.519-66.101 C373.996,266.495,374.006,245.51,359.268,238.907z"></path> </g> </g> </g> </g></svg></button>
                                </div>
                            }

                            <div className="category add-item" onClick={() => updateCategory()}>
                                {categoryEvent === false &&
                                    <p>+</p>
                                }
                                {categoryEvent &&
                                    <p>-</p>
                                }

                            </div>
                        </div>
                    </GenreSection>
                </div>
                <div className="description">
                    <p><i>{product.description || 'Sem descrição'}</i></p>
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
    )
}

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
            background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
        }
        .image-slider img {
            display: none;  
        }
    }
    @media (max-width: 367px) {
        // .image-slider::after {
        //     content: '';
        //     position: absolute;
        //     bottom: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 0;
        //     background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
        // }
    }
`;

const DataContainer = styled.div`
    padding: 30px 100px;
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;

    .hidden-title{
        display: none;
    }
    .description{
        width: 50%;
        margin-bottom: 20px;
    }
    .description p{
        font-size: 25px;
    }
    .other-informations{
        width: 50%;
    }
    .date{
        opacity: 0.8;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: fit-content;
        
    }
    .date p{
        margin-left: 10px;
    }

    @media (max-width: 879px){
        .date p{
            margin-left: 0;
        }
    }
    
    @media (max-width: 768px){
        padding: 30px 50px;
        flex-direction: column;
        h3{
            font-size: 18px;
            // margin-bottom: 5px;
        }
        .description{
            width: 100%;
            margin-top: 20px;
        }
        .other-informations{
            width: 100%;
        }
        .date p{
            margin-left: 10px;
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
            font-weight: 400;
        }
    }
    @media (max-width: 550px) {
        padding: 10px 10px;
        .hidden-title{
            font-size: 15px;
        }
        .description p {
            font-size: 20px;
        }
    }
`

const GenreSection = styled.div`
    display: flex;
    flex-direction: column;
    h3{
        opacity: 0.8;
        margin-top: 10px;
    }

    .categories{
        display: flex;
        flex-wrap: wrap;
    }
    
    .category{
        background: var(--almost-black);
        opacity: 0.8;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        padding: 10px 20px;
        margin: 10px 10px 0 0;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        &:hover{
            opacity: 1;
        }
    }
    .category.add-item{
        background: var(--white);
        color: black;
    }
    .category .input{
        border: none;
        background: transparent;
        outline: none;
        color: white;
        border-bottom: 1px solid white;
    }
    .category .send-btn{
        width: 30px;
        height: 30px;
        background: #01f48f;
        border: none;
        padding: 5px;
        cursor: pointer;
        border-radius: 2px;
    }
    .category .send-btn svg{
        width: 100%;
        height: 100%;
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
    color: red;

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

    label, h3{
        color: black;
    }
`

const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
`

const Loading = styled.div`
    height: 80vh;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`