import { StarRate } from "../StarRate"
import styled from "styled-components"
import { Link } from "react-router-dom"
import trashIcon from "../../assets/delete.png"
import api from '../../services/api'

interface ProductProps {
    product: {
        id: number,
        title: string,
        image: string,
    };
}

export const Product = ({ product }: ProductProps) => {
    async function deleteProduct(idProduct: number){
        try {
            await api.delete(`/products/${idProduct}`);
            alert(`Produto ${idProduct} deletado com sucesso. Recarregue a página para atualizar`);

        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
        
    }

    return (
        <ProductElement>
            <div className="image-prompt">
                <Link to={`/product/${product.id}`} className="link">
                    <img src={`https://books-register-api.onrender.com/uploads/${product.image}`} alt="product image" />
                </Link>
                <div className="delete-icon" >
                    <img src={trashIcon} alt="Delete icon" onClick={() => deleteProduct(product.id)} />
                </div>
            </div>
            <h3 className="product-title">{product.title}</h3>
            <div className="stars">
                <StarRate productId={product.id.toString()} />
            </div>
        </ProductElement>
    )
}

const ProductElement = styled.div`
    margin-bottom: 30px;
    .image-prompt{
        width: 300px;
        margin-bottom: 5px;
        position: relative;
    }
    .image-prompt .link img{
        border-radius: 5px;
        width: 100%;
        max-height: 425px;
        height: 100%;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .image-prompt .delete-icon{
        width: 40px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        background: white;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.85;
        transition: 0.15s ease-in;
        &:hover{
            opacity: 1;
        }
    }
    .image-prompt .delete-icon img{
        box-shadow: none;
        width: 30px;
        height: 30px;
    }

    .product-title{
        text-align: center;
        display: none;
        margin: 10px 0;
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
        .image-prompt .link img{
        max-height: 285px;
        height: 100%;
    }
    }
    @media (max-width: 768px){
        .image-prompt{
            width: 150px;
        }
        .image-prompt .link img{
            max-height: 215px;
            height: 100%;
        }
        .image-prompt .delete-icon{
            width: 30px;
            height: 30px;
        }
        .image-prompt .delete-icon img{
            width: 20px;
            height: 20px;
        }
    }
    @media (max-width: 550px){
        .image-prompt{
            width: 125px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .image-prompt .link img{
            min-height: 165px;
            max-height: 165px;
            width: 110px;
            height: 100%;
        }
        .product-title{
            font-size: 15px;
            text-align: center;
        } 
    }
`