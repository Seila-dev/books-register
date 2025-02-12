// import menuIcon from '../../assets/menu.png'
import closeIcon from '../../assets/close.png'
import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    const [ toggleActive, setToggleActive ] = useState<boolean>(false);

    const toggleBurguer = () => {
        setToggleActive(prevstate => !prevstate);
    }

    return (
        <>
        <HeaderElement>
            <nav>
                <svg className="header-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="menu-svg" aria-labelledby="menu-svg" aria-hidden="true" role="img" onClick={toggleBurguer}><title id="menu-svg">Menu</title><path d="M21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm0 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm0 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18z"></path></svg>
                {/* <img src={menuIcon} alt="menu" onClick={toggleBurguer} className='menu-icons menu' /> */}
                <h1><Link to="/">Books Register</Link></h1>
            </nav>
            <BurguerContainer IsOpened={toggleActive}>
                <div className="close-icon-container">
                    <img src={closeIcon} alt="close" onClick={toggleBurguer} className='menu-icons' />
                </div>
                <p className='aba-text'>Qual aba abrir agora?</p>
                <ul>
                    <Link to="/"><li>Biblioteca</li></Link>
                    <button className='add-category-btn'>+</button>
                </ul>
            </BurguerContainer>
        </HeaderElement>
        </>
    )
}

const HeaderElement = styled.header`
    padding: 10px 0;

    .menu-icons{
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
    nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 50px;
    }

    nav h1 a{
        color: white;
    }

    nav .header-svg-icon{
        width: 25px;
        cursor: pointer;
        fill: white;
    }
    @media (max-width: 550px){
        nav{
            margin: 0 20px;
        }
        nav h1 {
            font-size: 20px;
        }
    }
`

const BurguerContainer = styled.div<{ IsOpened: boolean }>`
    background: gray;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background: rgb(7,8,8);
background: linear-gradient(360deg, rgba(7,8,8,1) 0%, rgba(87,87,87,1) 100%);
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    top: 0;
    width: 450px;
    height: 100%;
    transition: 0.4s ease-out;
    padding: 15px;
    z-index: 4; 
    transform: ${(props) => (props.IsOpened ? "translateX(0)" : "translateX(-150%)")};
    .close-icon-container{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .aba-text{
        padding: 15px 0 0 0;
    }
    ul{
        width: 100%;
    }
    ul li, .add-category-btn{
        width: 100%;
        background: var(--almost-black);
        color: #fff;
        padding: 20px;
        border-radius: 10px;
        margin-top: 30px;
        text-align: center;
    }
    .add-category-btn{
        font-size: 30px;
        padding: 5px;
        border: none;
        cursor: pointer;
        background: var(--almost-white);
        transition: 0.1s ease-out;
        color: var(--black);
        &:hover{
            background: var(--light-purple);
        }
    }
    @media(max-width: 562px){
        width: 100%;
    }
`