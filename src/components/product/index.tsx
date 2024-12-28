import { products } from "../../mocks"
import { StarRate } from "../StarRate"
import styled from "styled-components"
import { Link } from "react-router-dom"

export const Product = () => {
    return (
        <>
            {products.map((product) => (
                <ProductElement key={product.id}>
                    <div className="image-prompt">
                        <Link to={`/product/${product.id}`}><img src={product.image} alt="product image" /></Link>
                    </div>
                    <div className="stars">
                        <StarRate />
                    </div>
                </ProductElement>
            ))}
        </>
    )
}

const ProductElement = styled.div`
    margin-bottom: 30px;
    .image-prompt{
        width: 300px;
        margin-bottom: 5px;
    }
    .image-prompt img{
        border-radius: 5px;
        width: 100%;
        max-height: 425px;
        height: 100%;
    }
    
    .stars{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        
        @media (max-width: 550px) {
            justify-content: center;
        }
    }


    @media (max-width: 1020px){
        .image-prompt{
            width: 200px;
        }
        .image-prompt img{
        max-height: 285px;
        height: 100%;
    }
    }
    @media (max-width: 768px){
        .image-prompt{
            width: 150px;
        }
        .image-prompt img{
            max-height: 215px;
            height: 100%;
        }
    }
    @media (max-width: 550px){
        .image-prompt{
            width: 125px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .image-prompt img{
            min-height: 165px;
            max-height: 165px;
            width: 110px;
            height: 100%;
        }
          
    }
`