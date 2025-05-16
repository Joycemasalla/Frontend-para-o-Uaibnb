import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 500px;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #1e7e34;
  }
`;

function NovaCaracteristica() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`, {
        fields: { nome }
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Característica criada com sucesso!');
      navigate('/caracteristicas');
    } catch (error) {
      console.error('Erro ao criar característica:', error);
    }
  };

  return (
    <Container>
      <h1>Nova Característica</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome da característica"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
}

export default NovaCaracteristica;
