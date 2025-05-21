import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* ---------- styled‑components ---------- */

const Container = styled.div`
  padding: 3rem 2rem;
  max-width: 700px;
  margin: 5rem auto;
  background-color: #f9fbfd;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.4rem;
  font-weight: 600;
  color: #2c3e50;
  
`;

const FormGroup = styled.div`
  margin-bottom: 1.8rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
`;

const inputBase = `
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  transition: border-color 0.25s ease;
  background-color: #fff;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
  }
`;

const Input = styled.input`${inputBase}`;
const Textarea = styled.textarea`${inputBase}  resize: vertical; min-height: 100px;`;

const CaracteristicasWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const CaracteristicaOption = styled.label`
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#3b82f6' : '#e5e7eb')};
  color: ${({ selected }) => (selected ? '#fff' : '#374151')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#2563eb' : '#d1d5db')};
  }
`;

const HiddenCheckbox = styled.input`display:none;`;

/* ---- novos botões unificados ---- */

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  flex-direction: column;

  @media (min-width: 420px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 1.2rem;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  border-radius: 14px;
  color: #fff;
  background-color: ${({ bg }) => bg || '#007bff'};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ hover }) => hover || '#0056b3'};
  }
`;

/* ---------- componente ---------- */

function NovaHospedagem() {
  const [titulo, setTitulo] = useState('');
  const [cidade, setCidade] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  const navigate = useNavigate();

  /* carrega características */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`,
          { headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` } }
        );
        setCaracteristicas(data.records);
      } catch (err) {
        console.error('Erro ao buscar características:', err);
      }
    })();
  }, []);

  /* máscara de preço */
  const formatarPreco = (valor) => {
    const nums = valor.replace(/\D/g, '');
    if (!nums) return '';
    const numero = parseInt(nums, 10) / 100;
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handlePrecoChange = (e) => {
    setPreco(formatarPreco(e.target.value));
  };

  /* submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const precoNum = Number(preco.replace(/\./g, '').replace(',', '.'));

    if (!titulo || !cidade || !descricao || !imagem) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    if (descricao.length < 10) {
      toast.error('Descrição deve ter pelo menos 10 caracteres');
      return;
    }
    if (isNaN(precoNum) || precoNum <= 0) {
      toast.error('Preço inválido');
      return;
    }

    const payload = {
      records: [
        {
          fields: {
            titulo,
            cidade,
            preco: precoNum,
            descricao,
            imagem,
            locacao_caracteristicas: selectedCaracteristicas,
          },
        },
      ],
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Hospedagem criada com sucesso!');
      setTimeout(() => navigate('/'), 1800);
    } catch (err) {
      console.error('Erro ao criar hospedagem:', err);
      toast.error('Erro ao criar hospedagem');
    }
  };

  const toggleCaracteristica = (id) =>
    setSelectedCaracteristicas((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );

  return (
    <Container>
      <Title>Nova Hospedagem</Title>

      <form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label>Título *</Label>
          <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Cidade *</Label>
          <Input value={cidade} onChange={(e) => setCidade(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Label>Preço (R$) *</Label>
          <Input
            value={preco}
            onChange={handlePrecoChange}
            placeholder="Ex: 1.200,00"
            inputMode="decimal"
            maxLength={15}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Descrição *</Label>
          <Textarea
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Imagem (URL) </Label>
          <Input
            type="url"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            required
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </FormGroup>

        <FormGroup>
          <Label>Características</Label>
          <CaracteristicasWrapper>
           { console.log('caracteristicas', caracteristicas)}
            {caracteristicas.map((c) => {
              const id = c.fields.locacao_caracteristicas?.[0];
              if (!id) return null;
              return (
                <CaracteristicaOption
                  key={id}
                  selected={selectedCaracteristicas.includes(id)}
                  htmlFor={`car-${id}`}
                >
                  <HiddenCheckbox
                    id={`car-${id}`}
                    type="checkbox"
                    checked={selectedCaracteristicas.includes(id)}
                    onChange={() => toggleCaracteristica(id)}
                  />
                  {c.fields.nome}
                </CaracteristicaOption>
              );
            })}
          </CaracteristicasWrapper>
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

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
}

export default NovaHospedagem;
