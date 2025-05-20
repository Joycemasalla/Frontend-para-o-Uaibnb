// src/components/Navbar.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: #1e3a8a;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Início</NavLink>
      <NavLink to="/nova">Nova Hospedagem</NavLink>
      <NavLink to="/caracteristicas">Características</NavLink>
      <NavLink to="/caracteristicas/nova">Nova Característica</NavLink>
    </Nav>
  );
}
