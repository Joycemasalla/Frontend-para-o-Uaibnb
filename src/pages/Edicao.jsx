import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Save, ArrowLeft } from 'lucide-react';

/* ---------- styled‑components ---------- */

const Container = styled.div`
  max-width: 600px;
  margin: 5rem auto;
  padding: 2rem 1rem;
  background-color: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  margin-bottom: 2.5rem;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 600;
  color: #2c3e50;

  @media (max-width: 480px) {
    font-size: 1.9rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
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
  background-color: ${(p) => p.bg || '#007bff'};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(p) => p.hover || '#0056b3'};
  }

  @media (max-width: 500px) {
    width: 100%;
    justify-content: center;
  }
`;

/* ---------- Componente ---------- */

function EditarHospedagem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo]       = useState('');
  const [cidade, setCidade]       = useState('');
  const [preco, setPreco]         = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem]       = useState('');

  /* Carrega dados */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes/${id}`,
          { headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` } }
        );
        setTitulo(data.fields.titulo);
        setCidade(data.fields.cidade);
        setPreco(data.fields.preco);
        setDescricao(data.fields.descricao);
        setImagem(data.fields.imagem || '');
      } catch (err) {
        console.error('Erro ao buscar hospedagem:', err);
        toast.error('Erro ao carregar hospedagem');
      }
    })();
  }, [id]);

  /* Atualiza dados */
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes/${id}`,
        {
          fields: {
            titulo,
            cidade,
            preco: Number(preco),
            descricao,
            imagem,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Hospedagem atualizada com sucesso!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Erro ao atualizar hospedagem:', err);
      toast.error('Erro ao atualizar hospedagem.');
    }
  }

  return (
    <Container>
      <Title>Editar Hospedagem</Title>
      <form onSubmit={handleUpdate}>
        <FormGroup>
          <Label>Título</Label>
          <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Cidade</Label>
          <Input value={cidade} onChange={(e) => setCidade(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Preço</Label>
          <Input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Descrição</Label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Imagem (URL)</Label>
          <Input value={imagem} onChange={(e) => setImagem(e.target.value)} />
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" bg="#28a745" hover="#218838">
            <Save size={18} /> Salvar
          </Button>
          <Button type="button" bg="#6c757d" hover="#5a6268" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Voltar
          </Button>
        </ButtonGroup>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}

export default EditarHospedagem;
