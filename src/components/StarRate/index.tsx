import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

export function StarRate({ productId }: { productId: string }) {

    // Estado para armazenar o rating
    const [rating, setRating] = useState<number>(0); 
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    // Lê o rating do localStorage sempre que o componente for montado
    useEffect(() => {
        // Tenta ler o rating do localStorage quando o componente for carregado
        const savedRating = localStorage.getItem(`rating-${productId}`);
        if (savedRating) {
            setRating(parseInt(savedRating)); // Define o rating do localStorage
        }
    }, [productId]); // Este efeito será executado sempre que o `productId` mudar

    // Atualiza o localStorage toda vez que o rating for alterado
    useEffect(() => {
        if (rating !== null) {
            localStorage.setItem(`rating-${productId}`, rating.toString());
        }
    }, [rating, productId]); // Re-armazenar rating no localStorage sempre que mudar

    // Renderiza as estrelas
    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const currentRate = index + 1;

            return (
                <Label key={currentRate}>
                    <StarInput
                        type="radio"
                        name="rate"
                        value={currentRate}
                        checked={currentRate === rating} // Marca a estrela clicada
                        onClick={() => setRating(currentRate)} // Atualiza o rating ao clicar
                    />
                    <StyledStar
                        color={currentRate <= (hoveredRating ?? rating) ? "orange" : "grey"} // Define a cor da estrela
                        className="star"
                        onMouseEnter={() => setHoveredRating(currentRate)} // Durante o hover, atualiza a cor
                        onMouseLeave={() => setHoveredRating(null)} // Reseta o hover
                    />
                </Label>
            );
        });
    };

    return <>{renderStars()}</>;
}

const StarInput = styled.input`
    opacity: 0;
    display: none;
`;

const Label = styled.label`
    .star {
        cursor: pointer;
        transition: 0.15s ease;
    }
`;

const StyledStar = styled(FaStar)`
    font-size: 45px;
    @media (max-width: 1020px) {
        font-size: 25px;
    }
    @media (max-width: 768px) {
        font-size: 20px;
    }
    @media (max-width: 550px) {
        font-size: 18px;
    }
`;
