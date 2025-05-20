import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Save, ArrowLeft } from 'lucide-react';

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-direction: column;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.2rem;
  background-color: ${(props) => props.bg || '#007bff'};
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.hover || '#0056b3'};
  }
`;

function EditarHospedagem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [cidade, setCidade] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    async function fetchHospedagem() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
          }
        );

        const data = response.data.fields;
        setTitulo(data.titulo);
        setCidade(data.cidade);
        setPreco(data.preco);
        setDescricao(data.descricao);
        setImagem(data.imagem || '');
      } catch (error) {
        console.error('Erro ao buscar hospedagem:', error);
        toast.error('Erro ao carregar hospedagem');
      }
    }

    fetchHospedagem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
      fields: {
        titulo,
        cidade,
        preco: Number(preco),
        descricao,
        imagem,
      },
    };

    try {
      await axios.patch(
        `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes/${id}`,
        dadosAtualizados,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Hospedagem atualizada com sucesso!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Erro ao atualizar hospedagem:', error);
      toast.error('Erro ao atualizar hospedagem.');
    }
  };

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
          <Input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Descrição</Label>
          <Textarea rows="4" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
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
