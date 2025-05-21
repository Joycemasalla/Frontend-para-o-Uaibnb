import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';

/* ---------- styled‑components ---------- */

const Container = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem 1rem;
  background-color: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  h1 {
    text-align: center;
    margin-bottom: 2.5rem;
    font-size: 2.4rem;
    font-weight: 600;
    color: #2c3e50;

    @media (max-width: 480px) {
      font-size: 1.9rem;
    }
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #444;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;

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

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  background-color: ${(props) => props.bg || '#007bff'};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.hover || '#0056b3'};
  }

  @media (max-width: 500px) {
    width: 100%;
    justify-content: center;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  color: green;
  font-weight: 500;
  text-align: center;
`;

/* ---------- Componente ---------- */

function EditarCaracteristica() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas/${id}`,
          { headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` } }
        );
        setNome(data.fields.nome || '');
        setDescricao(data.fields.descricao || '');
      } catch (err) {
        console.error('Erro ao carregar característica:', err);
      }
    })();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas/${id}`,
        { fields: { nome, descricao } },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMensagem('Característica atualizada com sucesso!');
      setTimeout(() => navigate('/caracteristicas'), 1500);
    } catch (err) {
      console.error('Erro ao atualizar característica:', err);
    }
  }

  return (
    <Container>
      <h1>Editar Característica</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <Input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="descricao">Descrição</label>
        <Textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição da característica..."
        />

        <ButtonGroup>
          <Button type="submit" bg="#28a745" hover="#218838">
            <Save size={18} />
            Salvar
          </Button>
          <Button
            type="button"
            bg="#6c757d"
            hover="#5a6268"
            onClick={() => navigate('/caracteristicas')}
          >
            <ArrowLeft size={18} />
            Voltar
          </Button>
        </ButtonGroup>

        {mensagem && <Message>{mensagem}</Message>}
      </form>
    </Container>
  );
}

export default EditarCaracteristica;
