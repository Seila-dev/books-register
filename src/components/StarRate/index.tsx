import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import api from '../../services/api'

export function StarRate({ productId }: { productId: string }) {
    const [rating, setRating] = useState<number>(0); 
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await api.get(`/products/${productId}`);
                setRating(response.data.stars || 0);
            } catch (error) {
                console.error("Erro ao buscar a classificação do produto", error);
            }
        }

        fetchRating();
    }, [productId])
    const updateRating = async (newRating: number) => {
        try {
            await api.put(`/products/${productId}`, {
                stars: newRating
            });
            setRating(newRating);
        } catch (error) {
            console.error('Erro ao atualizar as estrelas', error);
        }
    }

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
                        onClick={() => updateRating(currentRate)} // Atualiza o rating ao clicar
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
