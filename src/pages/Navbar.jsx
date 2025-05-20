import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Nav = styled.nav`
  background: #1e3a8a;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
`;

const MenuIcon = styled.div`
  display: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: #1e3a8a;
    padding: 1rem 2rem;
    display: ${({ open }) => (open ? 'flex' : 'none')};
  }
`;

const NavLink = styled(Link)`
  color: ${({ active }) => (active ? '#93c5fd' : '#fff')};
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: #bfdbfe;
  }
`;

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <NavLink to="/" ><Logo> Hospedagens</Logo></NavLink>
      <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </MenuIcon>
      <NavLinks open={menuOpen}>
        <NavLink to="/" active={location.pathname === '/'} onClick={() => setMenuOpen(false)}>Início</NavLink>
        <NavLink to="/nova" active={location.pathname === '/nova'} onClick={() => setMenuOpen(false)}>Nova Hospedagem</NavLink>
        <NavLink to="/caracteristicas" active={location.pathname === '/caracteristicas'} onClick={() => setMenuOpen(false)}>Características</NavLink>
        <NavLink to="/caracteristicas/nova" active={location.pathname === '/caracteristicas/nova'} onClick={() => setMenuOpen(false)}>Nova Característica</NavLink>
      </NavLinks>
    </Nav>
  );
}
