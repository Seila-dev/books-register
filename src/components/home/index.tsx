import styled from 'styled-components';
import { Product } from '../product';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import closeIcon from '../../assets/close.png';
import api from '../../services/api';

export const Home = () => {
    interface Data {
        id: number;
        title: string;
        image: string;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Data>();
    const [updateEvent, setUpdateEvent] = useState<boolean>(false);
    const [products, setProducts] = useState<Data[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFile(e.target.files[0]);
        }
    };

    async function getProducts() {
        const response = await api.get('/products');
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    

    const handleSubmitForm = async (data: Data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);

            // Envia a imagem se um arquivo foi selecionado
            if (imageFile) {
                formData.append("file", imageFile);
            }

            // Envia o arquivo para o backend para salvar
            const uploadResponse = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const imagePath = uploadResponse.data.imagePath;  // Nome ou caminho da imagem salvo no backend

            // Cria o produto no banco de dados com o título e a imagem
            const productData = {
                title: data.title,
                image: imagePath  // Caminho ou nome da imagem
            };

            const response = await api.post('/products', productData);

            const newProduct = {
                id: response.data.id,  // Usar o id gerado pelo backend
                title: response.data.title,
                image: response.data.image,
            };

            // Atualiza a lista de produtos
            setProducts([...products, newProduct]);
            setUpdateEvent(false);  // Fecha o formulário de adição
            setImageFile(null);  // Limpa o estado da imagem
        } catch (error) {
            console.log(error);
        }
    };

    const updateEvents = () => {
        setUpdateEvent(!updateEvent);
    }

    return (
        <>
            <MainContainer>
                <h2 className='section-title'>Biblioteca - Todos os conteúdos</h2>
                <Section>
                    {products.map(product => (
                        <Product key={product.id} product={product} />
                    ))}

                    <AddProduct onClick={updateEvents} >
                        <div><p>+</p></div>
                    </AddProduct>
                </Section>

                {updateEvent &&
                    <Lightbox>
                        <div className="white-box">
                            <div className="close-container">
                                <h3>Adicionar Produto</h3>
                                <img src={closeIcon} alt="Close icon" onClick={() => setUpdateEvent(!updateEvent)} />
                            </div>
                            <label htmlFor="text">Título *</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Título"
                                maxLength={30}
                                {...register("title", { required: true })}
                            />
                            {errors.title && <ErrorMessage>é necessário escrever algo aqui</ErrorMessage>}

                            <label htmlFor="image">Imagem *</label>
                            <input
                                type="file"
                                id="image"
                                accept='image/*'
                                onChange={handleImageChange}
                            />
                            {errors.image && <ErrorMessage>é necessário fornecer uma imagem</ErrorMessage>}

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
        padding: 0px;
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
    z-index: 0;
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
