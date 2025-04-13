import styled from "styled-components"
import { Link } from "react-router-dom"

interface MenuBurguerProps {
    active: boolean;
    toggleMenu: () => void;
}

export const MenuBurguer = ({ active, toggleMenu }: MenuBurguerProps) => {

    return (
        <MenuContainer $active={active}>
            <div className="menu-header">
                <span className="material-symbols-outlined close-icon" onClick={toggleMenu}>
                    close
                </span>
                <p className="headerTitle">JOY <span className="logo">System</span></p>
            </div>
            <ul className="menu-nav">
                <Link to="/dashboard" onClick={toggleMenu}>
                    <span className="material-symbols-outlined close-icon" >
                        home
                    </span>
                    <li>Home</li>
                </Link>
                <Link to="user" onClick={toggleMenu}>
                    <span className="material-symbols-outlined close-icon" >
                        person
                    </span>
                    <li>Perfil</li>
                </Link>
                <Link to="quests" onClick={toggleMenu}>
                    <span className="material-symbols-outlined close-icon" >
                        stack
                    </span>
                    <li>Quest System</li>
                </Link>
                <Link to="store" onClick={toggleMenu}>
                    <span className="material-symbols-outlined close-icon" >
                        shopping_cart
                    </span>
                    <li>JoyStore</li>
                </Link>
                <Link to="notes" onClick={toggleMenu}>
                    <span className="material-symbols-outlined close-icon" >
                        edit
                    </span>
                    <li>Notes</li>
                </Link>
                <Link to="calendar" onClick={toggleMenu}>
                    <span className="material-symbols-outlined close-icon" >
                        calendar_today
                    </span>
                    <li>Calendário</li>
                </Link>
            </ul>
        </MenuContainer>
    )
}

const MenuContainer = styled.div<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    position: fixed;
    transition: 0.3s ease-in-out;
    transform: ${props => (props.$active ? 'translateX(0%)' : 'translateX(-150%)')};
    z-index: 7;
    top: 0;
    left: 0;
    height: 100%;
    //background: #4c6759;
    background: var(--primary);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    color: white;
    width: 300px;
    .menu-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid black;
        padding: 20px;
    }
    .menu-header .close-icon{
        width: 20px;
        cursor: pointer;
    }

    .menu-nav{
        padding: 20px;
    }

    .headerTitle{
        font-size: 1.5rem;
        font-weight: 700;
    }
    .logo{
        opacity: 0.5;
        font-size: 15px;
    }
    .menu-nav a{
        display: flex;
        align-items: center;
        padding: 15px 5px;
        margin-bottom: 5px;   
        border-radius: 5px;
        transition: 0.15s ease-in;
        gap: 10px;
        &:hover{
            background: black;
            color: white;
        }
    }
    .menu-nav li{
        font-weight: 500;
    }
    .menu-nav .products-category{
        font-weight: 400;
    }
    .menu-nav .products-category p{
        margin: 10px 0 10px 30px;
        opacity: 0.9;
    }

    @media(max-width: 425px){
        width: 100%;
    }
`