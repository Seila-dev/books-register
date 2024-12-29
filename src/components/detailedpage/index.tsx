import { useState, useRef } from "react";
import ManhwaImage1 from '../../assets/manhwa-image.jpg';
import styled from "styled-components";

export const DetailedPage = () => {
  const [inputValue, setInputValue] = useState<string>(""); 
  const inputRef = useRef<HTMLInputElement | null>(null); 

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
 

    if (newValue.length <= 30) {
        setInputValue(newValue);

        if (inputRef.current) {
            const newWidth = Math.max(100, newValue.length * 8);;
            inputRef.current.style.width = `${newWidth}px`
        }
    }
    
    
  };

  return (
    <Section>
      <div className="container">
        <div className="image-slider">
          <div className="image-prompt">
            <img src={ManhwaImage1} alt="Imagem" />
            <h1 className="product-title">Nessa vida eu serei a vilã</h1>
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
      </div>
    </Section>
  );
};

const Section = styled.section`
  .image-slider {
    background: linear-gradient(to right, gray 35%, whitesmoke);
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
    top: 45%;
    left: 260px;
    width: 550px;
    font-size: 35px;
    color: white;
  }
`;

const GenreSection = styled.div`
  background: blue;
  .categories {
    background: orangered;
    width: 50px;
    overflow-y: visible;
    border-radius: 5px;
  }
  .category-input {
    min-width: 50px;
    padding: 8px;
    border: none;
    background: orangered;
    color: white;
    outline: none;
    transition: width 0.2s ease;
    &::placeholder {
      color: #ccc;
    }
  }
`;
