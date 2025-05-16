import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.4rem;
  background-color: ${(props) => props.color || '#0077cc'};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.hover || '#005fa3'};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Nome = styled.h2`
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 0.5rem;
`;

const Descricao = styled.p`
  font-size: 1rem;
  color: #666;
  flex: 1;
`;

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

function Caracteristicas() {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCaracteristicas() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            }
          }
        );
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
        <Button onClick={() => navigate('/caracteristicas/nova')}>
          Nova Característica
        </Button>
        <Button color="#ee5311" hover="#b64e09" onClick={() => navigate('/')}>
          Voltar
        </Button>
      </ButtonGroup>

      <GridContainer>
        {caracteristicas.map((item) => (
          <Card key={item.id}>
            <Nome>{item.fields.nome}</Nome>
            <Descricao>{item.fields.descricao}</Descricao>
            <Actions>
              <Button
                color="#28a745"
                hover="#218838"
                onClick={() => navigate(`/caracteristicas/editar/${item.id}`)}
              >
                Editar
              </Button>
            </Actions>
          </Card>
        ))}
      </GridContainer>
    </Container>
  );
}

export default Caracteristicas;
