import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function EditarCaracteristica() {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCaracteristica() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas/${id}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
          }
        });

        setNome(response.data.fields.nome);
      } catch (error) {
        console.error('Erro ao carregar característica:', error);
      }
    }

    fetchCaracteristica();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas/${id}`, {
        fields: { nome }
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Característica atualizada com sucesso!');
      navigate('/caracteristicas');
    } catch (error) {
      console.error('Erro ao atualizar característica:', error);
    }
  };

  return (
    <Container>
      <h1>Editar Característica</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
}

export default EditarCaracteristica;
