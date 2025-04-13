import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';
import { MenuBurguer } from './menuBurguer';

export const Header = () => {

    const [openMenu, setOpenMenu] = useState<boolean>(false)

    const handleOpenMenu = () => {
        setOpenMenu(true);
    };

    const { isAuthenticated, user } = useContext(AuthContext)

    if (isAuthenticated) {
        console.log(user)
    }

    return (
        <HeaderContainer>
            <HeaderLeft>
                <MenuBtn onClick={handleOpenMenu}>
                    <span className="material-symbols-outlined icon">
                        menu
                    </span>
                </MenuBtn>
                <span className="material-symbols-outlined icon">
                    menu_book
                </span>
                <h1>Books Register</h1>
            </HeaderLeft>
            <Nav>
                <NavItem href="/todos">
                    <span className="material-symbols-outlined icon">
                        menu_book
                    </span>
                    Todos
                </NavItem>
                <NavItem href="/livros">
                    <span className="material-symbols-outlined icon">
                        menu_book
                    </span>
                    Livros
                </NavItem>
                <NavItem href="/filmes">
                    <span className="material-symbols-outlined icon">
                        movie
                    </span>
                    Filmes
                </NavItem>
                <NavItem href="/series">
                    <span className="material-symbols-outlined icon">
                        tv
                    </span>
                    Séries
                </NavItem>
                <NavItem href="/categorias">
                    <span className="material-symbols-outlined icon">
                        search
                    </span>
                    Categorias
                </NavItem>
                {isAuthenticated && user?.username ? (
                    <Link className="userSetup" to="user"> {user?.username} </Link>
                ) : (
                    <Link className="signIn" to="/login">Sign In</Link>
                )}
            </Nav>

            <MenuBurguer active={openMenu} toggleMenu={handleOpenMenu} />
        </HeaderContainer>
    );
};


const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .icon {
        font-size: 2rem;
        color: #333;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    h1 {
        margin-left: 0.5rem;
        font-size: 1.5rem;
        color: #333;
    }

    @media(max-width: 500px){
        h1 {
            font-size: 0.8rem;
        }
        .icon {
            font-size: 1.4rem;
        }
    }
`;

const MenuBtn = styled.div`
    margin-right: 10px;
`

const Nav = styled.nav`
    display: flex;
    gap: 1.5rem;
`;

const NavItem = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #555;
    font-size: 1rem;
    transition: color 0.3s;
    gap: 10px;

    &:hover {
        color: #007bff;
    }

    .icon{
        font-size: 1.2rem;
    }

    @media(max-width: 900px){
        display: none;
    }
`;