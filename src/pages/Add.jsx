// Importação de bibliotecas e hooks
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para navegação programática


const Container = styled.div`
  padding: 3rem;
  max-width: 700px;
  margin: auto;
  background-color: #f9fbfd;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #1f2937;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 0.6rem;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const Voltar = styled(Button)`
  background-color: #f59e0b;

  &:hover {
    background-color: #d97706;
  }
`;

// Novo estilo para as características (checkboxes)
const CaracteristicasWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const CaracteristicaOption = styled.label`
  background-color: ${(props) => (props.selected ? '#3b82f6' : '#e5e7eb')};
  color: ${(props) => (props.selected ? 'white' : '#374151')};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  border: 2px solid transparent;

  &:hover {
    background-color: ${(props) => (props.selected ? '#2563eb' : '#d1d5db')};
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

function NovaHospedagem() {
  const [titulo, setTitulo] = useState('');
  const [cidade, setCidade] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaracteristicas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_AIRTABLE_BASE_URL}/caracteristicas`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          },
        });

        setCaracteristicas(response.data.records);
      } catch (error) {
        console.error('Erro ao buscar características:', error);
      }
    };
    fetchCaracteristicas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaHospedagem = {
      records: [
        {
          fields: {
            titulo,
            cidade,
            preco: Number(preco),
            descricao,
            imagem,
            locacao_caracteristicas: selectedCaracteristicas,
          },
        },
      ],
    };

    //console.log('Enviando para Airtable:', JSON.stringify(novaHospedagem, null, 2));
    console.log('IDs selecionados:', selectedCaracteristicas);
    // console.table(

    //   caracteristicas
    //     .filter(c => selectedCaracteristicas.includes(c.id))
    //     .map(c => c.fields.nome)
    // );
    console.log('Hospedagem a ser enviada:', JSON.stringify(novaHospedagem, null, 2));

    try {
      await axios.post(
        `${process.env.REACT_APP_AIRTABLE_BASE_URL}/locacoes`,
        novaHospedagem,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Hospedagem criada com sucesso!');
      setTitulo('');
      setCidade('');
      setPreco('');
      setDescricao('');
      setImagem('');
      setSelectedCaracteristicas([]);
    } catch (error) {
      console.error('Erro ao criar hospedagem:', error.response?.data || error.message);
      alert('Erro ao criar hospedagem.');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCaracteristicas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Container>
      <Title>Nova Hospedagem</Title>

      <form onSubmit={handleSubmit}>
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

        <FormGroup>
          <Label>Características</Label>
          <CaracteristicasWrapper>
            {caracteristicas.map((carac) => {
              const ids = carac.fields.locacao_caracteristicas;

              if (!ids || !Array.isArray(ids) || ids.length === 0) return null;

              const id = ids[0]; // acessa com segurança

              return (
                <CaracteristicaOption
                  key={id}
                  selected={selectedCaracteristicas.includes(id)}
                >
                  <HiddenCheckbox
                    type="checkbox"
                    value={id}
                    checked={selectedCaracteristicas.includes(id)}
                    onChange={() => handleCheckboxChange(id)}
                  />
                  {carac.fields.nome}
                  {console.log('ID da característica:', selectedCaracteristicas)}

                </CaracteristicaOption>
              );
            })}

          </CaracteristicasWrapper>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit">Salvar</Button>
          <Voltar type="button" onClick={() => navigate('/')}>Voltar</Voltar>
        </ButtonGroup>
      </form>
    </Container>
  );
}

export default NovaHospedagem;
