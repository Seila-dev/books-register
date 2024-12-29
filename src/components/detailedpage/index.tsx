import { useState, useRef } from "react";
import ManhwaImage1 from '../../assets/manhwa-image.jpg';
import styled from "styled-components";
import { StarRate } from "../StarRate";
import editIcon from '../../assets/edit.png'

export const DetailedPage = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = (e: any) => {
        const newValue = e.target.value;


        if (newValue.length <= 30) {
            setInputValue(newValue);

            if (inputRef.current) {
                const newWidth = Math.max(80, newValue.length * 10);;
                inputRef.current.style.width = `${newWidth}px`
            }
        }


    };

    return (
        <Section>
            <div className="image-slider">
                <div className="editProduct">
                    <button><img src={editIcon} alt="edit icon" /></button>
                </div>
                <div className="image-prompt">
                    <img src={ManhwaImage1} alt="Imagem" />

                </div>
                <h1 className="product-title">Nessa vida eu serei a vilã</h1>
                <div className="stars desktop">
                    <StarRate />
                </div>
            </div>
            <DataContainer className="container">
                <div className="hidden-title">
                    <h1 className="product-title">Nessa vida eu serei a vilã</h1>
                    <div className="stars responsive">
                        <StarRate />
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
                            onChange={handleInputChange} // Atualiza o valor e ajusta a largura
                            placeholder="gênero"
                        />
                    </div>
                </GenreSection>
                <div className="description">
                    <h2>Descrição</h2>
                    <p>Gostei muito do livro, sério, 10/10, amei.</p>
                </div>
                <div className="date">
                    <h2>Data de início e final da leitura</h2>
                    <p>11/22/2424 - 11/22/2025</p>
                </div>
            </DataContainer>
        </Section>
    );
};

const Section = styled.section`
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
            background-image: url(${ManhwaImage1});
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
            background: linear-gradient(to top, white, rgba(0, 0, 0, 0));
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
            background: linear-gradient(to top, white, rgba(0, 0, 0, 0));
        }
    }
`;

const DataContainer = styled.div`
    padding: 0 100px;
    .hidden-title{
        display: none;
    }
    .description{
        margin: 30px 0;
    }
    @media (max-width: 768px){
        padding: 0 50px;
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
        }
    }
    @media (max-width: 550px) {
        padding: 0 10px;
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
