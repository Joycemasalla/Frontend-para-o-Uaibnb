import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

const Container = styled.div`
  max-width: 600px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    margin: 1rem;
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.2rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.85rem 1rem;
  background-color: ${(props) => props.bg || '#007bff'};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.hover || '#0056b3'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

function NovaCaracteristica() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`, {
        fields: { nome, descricao }
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
        <Textarea
          placeholder="Descrição da característica"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <ButtonGroup>
          <Button type="submit" bg="#28a745" hover="#218838">
            <Save size={18} /> Salvar
          </Button>
          <Button type="button" bg="#6c757d" hover="#5a6268" onClick={() => navigate('/caracteristicas')}>
            <ArrowLeft size={18} /> Voltar
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  );
}

export default NovaCaracteristica;
