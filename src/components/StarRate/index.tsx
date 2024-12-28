import { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import styled from 'styled-components';

export function StarRate() {

    const [ rating, setRating ] = useState<number | null>(null);
    const [ hoveredRating, setHoveredRating] = useState<number | null>(null);

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const currentRate = index + 1;
            
            

            return (      
                    <Label key={currentRate}>
                    <StarInput
                    type='radio'
                    name='rate'
                    value={currentRate}
                    onClick={() => setRating(currentRate)}/>
                        <StyledStar
                        color={currentRate <= (hoveredRating !== null ? hoveredRating : (rating ?? 0)) ? "orange" : "grey"}
                        className='star'
                        onMouseEnter={() => setHoveredRating(currentRate)}
                        onMouseLeave={() => setHoveredRating(null)}
                        />
                    </Label>

            )
        })
    }

    return (

        <>
            {renderStars()}
        </>
    );
}

const StarInput = styled.input`
    opacity: 0;
    display: none;
`

const Label = styled.label`
    .star{
        cursor: pointer;
        transition: 0.15s ease;
    }
`

const StyledStar = styled(FaStar)`
    font-size: 45px;
    @media (max-width: 1020px){
        font-size: 25px;
    }
    @media (max-width: 768px) {
        font-size: 20px;
    }
    @media (max-width: 550px) {
        font-size: 18px;
    }
`