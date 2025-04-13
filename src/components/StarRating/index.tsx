// StarRating.tsx
import React from 'react';
import styled from 'styled-components';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void; // Função de callback para atualizar o rating
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  return (
    <StarsContainer>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => onRate(star)}  // Chama a função onRate quando a estrela for clicada
          clickable
        >
          ★
        </Star>
      ))}
    </StarsContainer>
  );
};

const StarsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span<{ filled: boolean; clickable: boolean }>`
  font-size: 1.5rem;
  color: ${({ filled }) => (filled ? '#FFD700' : '#555')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition: color 0.2s;
  user-select: none;
`;

