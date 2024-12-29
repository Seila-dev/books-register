import { useState, useRef } from "react";
import ManhwaImage1 from '../../assets/manhwa-image.jpg';
import styled from "styled-components";
import { StarRate } from "../StarRate";

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
                <div className="image-prompt">
                    <img src={ManhwaImage1} alt="Imagem" />
                    
                </div>
                <h1 className="product-title">Nessa vida eu serei a vilã</h1>
                    <div className="stars">
                    <StarRate />
                    </div>
            </div>
            <DataContainer className="container">
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
    background: linear-gradient(to right, #ccc 25%, black);
    height: 300px;
    position: relative;
    width: 100%;
    margin-bottom: 150px;
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
    .stars{
        position: absolute;
        top: 60%;
        left: 550px;
    }
    @media (max-width: 1020px){
        .image-slider .product-title {
            font-size: 25px;
            width: 350px;
        }
        .stars, .image-slider .product-title{
            left: 400px;
        }
    }
    @media (max-width: 768px){
        .image-slider .product-title {
            color: black;
        }
        .image-slider {
            background-image: url(${ManhwaImage1});
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            margin-bottom: 30px;
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
`;

const DataContainer = styled.div`
    padding: 0 100px;
    .description{
        margin: 30px 0;
    }
`

const GenreSection = styled.div`
    display: flex;
  
  .categories {
    background: orangered;
    width: 100px;
    overflow-y: visible;
    border-radius: 5px;
    margin-left: 30px;
  }
  .category-input {
    min-width: 100px;
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
