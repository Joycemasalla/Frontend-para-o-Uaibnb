import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Estilização aprimorada
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Lista = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

const Item = styled.li`
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nome = styled.span`
  font-size: 1.1rem;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const BotaoNova = styled.button`
  padding: 0.6rem 1.4rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005fa3;
  }
`;

const BotaoEditar = styled.button`
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;


 const VoltarCarc = styled.button`
   padding: 0.5rem 1rem;
  background-color: #ee5311;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b64e09;
  }
  `;

function Caracteristicas() {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCaracteristicas() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
          }
        });
        setCaracteristicas(response.data.records);
      } catch (error) {
        console.error('Erro ao buscar características:', error);
      }
    }

    fetchCaracteristicas();
  }, []);

  return (
    <Container>
      <Title>Características</Title>

      <ButtonGroup>
        <BotaoNova onClick={() => navigate('/caracteristicas/nova')}>
          Nova Característica
        </BotaoNova>
        <VoltarCarc type="button" onClick={() => navigate('/')}>Voltar</VoltarCarc>
      </ButtonGroup>

      <Lista>
        {caracteristicas.map((item) => (
          <Item key={item.id}>
            <Nome>{item.fields.nome}</Nome>
            <BotaoEditar onClick={() => navigate(`/caracteristicas/editar/${item.id}`)}>
              Editar
            </BotaoEditar>
          </Item>
        ))}
      </Lista>
    </Container>
  );
}

export default Caracteristicas;
