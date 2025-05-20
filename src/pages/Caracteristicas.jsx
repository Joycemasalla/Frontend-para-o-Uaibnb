import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiPlus, FiArrowLeft, FiEdit2 } from 'react-icons/fi';

const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const ActionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.6rem;
  background: ${({ variant }) =>
    variant === 'green' ? '#28a745' : variant === 'orange' ? '#ee5311' : '#0077cc'};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;

  &:hover {
    background: ${({ variant }) =>
    variant === 'green'
      ? '#218838'
      : variant === 'orange'
        ? '#b64e09'
        : '#005fa3'};
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 2rem;
`;

const Card = styled.article`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  }
`;

const Nome = styled.h2`
  font-size: 1.3rem;
  color: #34495e;
  margin-bottom: 0.6rem;
`;

const Descricao = styled.p`
  font-size: 0.93rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const EditBtn = styled.button`
  align-self: flex-start;
  background: transparent;
  border: 2px solid #28a745;
  color: #28a745;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #28a745;
    color: #fff;
  }
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
      <Title>
        <FiSettings style={{ verticalAlign: 'middle', marginRight: 8 }} />
        Características Cadastradas
      </Title>

      <ActionBar>

        <ActionButton onClick={() => navigate('/caracteristicas/nova')}>
          <FiPlus size={18} />
          Nova Característica
        </ActionButton>

        <ActionButton variant="orange" onClick={() => navigate('/')}>
          <FiArrowLeft size={18} />
          Voltar à Home
        </ActionButton>
      </ActionBar>

      <Grid>
        {caracteristicas.map((item) => (
          <Card key={item.id}>
            <Nome>{item.fields.nome}</Nome>
            <Descricao>{item.fields.descricao}</Descricao>
            <EditBtn onClick={() => navigate(`/caracteristicas/editar/${item.id}`)}>
              <FiEdit2 size={16} />
              Editar
            </EditBtn>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Caracteristicas;
