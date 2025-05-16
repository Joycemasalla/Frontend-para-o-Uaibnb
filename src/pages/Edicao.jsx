import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Estilos
const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
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

function EditarHospedagem() {
  const { id } = useParams(); // Pegamos o ID da URL
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [cidade, setCidade] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  // Buscar dados existentes da hospedagem pelo ID
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
        alert('Erro ao carregar hospedagem');
      }
    }

    fetchHospedagem();
  }, [id]);

  // Salvar alterações
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

      alert('Hospedagem atualizada com sucesso!');
      navigate('/'); // Redireciona para a Home
    } catch (error) {
      console.error('Erro ao atualizar hospedagem:', error);
      alert('Erro ao atualizar.');
    }
  };

  return (
    <Container>
      <h1>Editar Hospedagem</h1>
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

        <Button type="submit">Salvar Alterações</Button>
      </form>
    </Container>
  );
}

export default EditarHospedagem;
