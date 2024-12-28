// import { products } from "../../mocks"
import ManhwaImage1 from '../../assets/manhwa-image.jpg'
import styled from "styled-components"

export const DetailedPage = () => {

    return (
        <Section>
            <div>
                <div className="image-slider">
                    <div className="image-prompt">
                        <img src={ManhwaImage1} alt="Imagem" />
                        <h1 className="product-title">Nessa vida eu serei a vilã</h1>
                    </div>
                    
                </div>
                <div className="genre">
                    <h2>Gênero</h2>
                </div>
            </div>
        </Section>
    )
}

const Section = styled.section`
    
    .image-slider{
        background: linear-gradient(to right, gray 35%, whitesmoke);
        height: 300px;
        position: relative;
        width: 100%;
    }
    .image-prompt{
        width: 230px;
        position: absolute;
        top: 80px;
        left: 15%;

    }
    .image-slider .image-prompt img{
        width: 100%;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .image-slider .product-title{
        position: absolute;
        top: 45%;
        left: 260px;
        width: 550px;
        font-size: 35px;
        color: white;
    }
`